
import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";
import { trackedBugsService } from "../services/TrackedBugsService.js";

export class BugsController extends BaseController {
    constructor() {
        super('api/bugs')
        this.router
            .get('', this.getAllBugs)
            .get('/:bugId', this.getBugById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createBug)
            .put('/:bugId', this.editBug)
            .delete('/:bugId', this.destroyBug)
            .get('/:bugId/notes', this.getNotesByBugId)
            .get('/:bugId/trackedbugs', this.getTrackedBugsFromBugId)
    }
    async getTrackedBugsFromBugId(request, response, next) {
        try {
            let id = request.params.bugId
            const trackedBugs = await trackedBugsService.getTrackedBugsFromBugId(id)
            response.send(trackedBugs)
        } catch (error) {
            next(error)
        }
    }
    async getNotesByBugId(request, response, next) {
        try {
            const bugId = request.params.bugId
            const notes = await notesService.getNotesByBugId(bugId)
            response.send(notes)
        } catch (error) {
            next(error)
        }
    }
    async destroyBug(request, response, next) {
        try {
            const bugId = request.params.bugId
            const user = request.userInfo
            const bug = await bugsService.destroyBug(bugId, user.id)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }
    
    async editBug(request, response, next) {
        try {
            const bugId = request.params.bugId
            const bugUpdateData = request.body
            const user = request.userInfo
            const bug = await bugsService.editBug(bugId, user.id, bugUpdateData)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async getBugById(request, response, next) {
        try {
            const bugId = request.params.bugId
            const bugs = await bugsService.getBugById(bugId)
            response.send(bugs)
        } catch (error) {
            next(error)
        }
    }

    async createBug(request, response, next) {
        try {
            const bugData = request.body
            const user = request.userInfo
            bugData.creatorId = user.id
            const bug = await bugsService.createBug(request.body)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async getAllBugs(request, response, next) {
        try {
            const bugs = await bugsService.getAllBugs()
            response.send(bugs)
        } catch (error) {
            next(error)
        }
    }
}
