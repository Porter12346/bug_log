import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class TrackedBugsService {

    async destroyTrackedBug(id, userId) {
        let trackedBug = await dbContext.TrackedBugs.findById(id)
        if (trackedBug.accountId != userId) {
            throw new Forbidden("NO!")
        } 
        await trackedBug.deleteOne()
        return('why would you delete my tracked bug like that 😭')
    }

    async getTrackedBugsByUser(userId) {
        let trackedBugs = await dbContext.TrackedBugs.find({ accountId: userId }).populate('tracker bug')
        return (trackedBugs)
    }

    async getTrackedBugsFromBugId(bugId) {
        let trackedBugs = await dbContext.TrackedBugs.find({ bugId: bugId }).populate('tracker')
        return (trackedBugs)
    }

    async createTrackedBug(trackedData) {
        const tracked = await dbContext.TrackedBugs.create(trackedData)
        await tracked.populate('tracker bug')
        return (tracked)
    }

}
export const trackedBugsService = new TrackedBugsService()