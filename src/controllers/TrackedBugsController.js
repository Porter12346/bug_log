
import { Auth0Provider } from "@bcwdev/auth0provider";
import { trackedBugsService } from "../services/TrackedBugsService.js";
import BaseController from "../utils/BaseController.js";

export class TrackedBugsController extends BaseController {
    constructor() {
        super('api/trackedbugs')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTrackedBug)
            .delete('/:id', this.destroyTrackedBug)
    }

    async destroyTrackedBug(request, response, next) {
        try {
            let id = request.params.id
            let user = request.userInfo
            let trackedBug = await trackedBugsService.destroyTrackedBug(id, user.id)
            response.send(trackedBug)
        } catch (error) {
            next(error)
        }
    }

    async createTrackedBug(request, response, next) {
        try {
            const trackedData = request.body
            const user = request.userInfo
            trackedData.accountId = user.id
            const tracked = await trackedBugsService.createTrackedBug(trackedData)
            response.send(tracked)
        } catch (error) {
            next(error)
        }
    }
}