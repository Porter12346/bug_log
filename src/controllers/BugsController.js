
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
            .put('', this.editBug)
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
