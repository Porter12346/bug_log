import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class BugsService {
    async destroyBug(bugId, id) {
        const bug = await this.getBugById(bugId)
        if (bug.creatorId != id) {
            throw new Forbidden("NO!")
        } 
        await bug.deleteOne()
        return `${bug.title} has been deleted.`
    }
    async editBug(bugId, id, bugUpdateData) {
        const originalBug = await dbContext.Bugs.findById(bugId)
        if (id != originalBug.creatorId) {
            throw new Forbidden("How dare you!")
        } 
        if (originalBug.closed){
            throw new Forbidden("Bug already closed")
        }
        originalBug.title = bugUpdateData.title || originalBug.title
        originalBug.description = bugUpdateData.description || originalBug.description
        originalBug.closed = bugUpdateData.closed ?? originalBug.closed
        originalBug.save()
    }

    async getBugById(bugId) {
        const bugs = await dbContext.Bugs.findById(bugId).populate('creator')
        if (!bugs){
            throw new BadRequest ('Unable to find bugId.')
        }
        return (bugs)
    }

    async getAllBugs() {
        const bugs = await dbContext.Bugs.find().populate('creator')
        return (bugs)
    }

    async createBug(body) {
        const bug = await dbContext.Bugs.create(body)
        await bug.populate('creator')
        return (bug)
    }

}

export const bugsService = new BugsService()