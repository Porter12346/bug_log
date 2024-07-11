
import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";

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
    }
    destroyBug(arg0, destroyBug) {
        throw new Error("Method not implemented.");
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
