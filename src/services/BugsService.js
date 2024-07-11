import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class BugsService {
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