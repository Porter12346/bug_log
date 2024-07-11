import { dbContext } from "../db/DbContext.js"

class BugsService {

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