import { dbContext } from "../db/DbContext.js"

class TrackedBugsService{
    async createTrackedBug(trackedData) {
        const tracked = await dbContext.TrackedBugs.create(trackedData)
        await tracked.populate('tracker bug')
        return (tracked)
    }

}
export const trackedBugsService = new TrackedBugsService()