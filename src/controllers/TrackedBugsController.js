
import { Auth0Provider } from "@bcwdev/auth0provider";
import { trackedBugsService } from "../services/TrackedBugsService.js";
import BaseController from "../utils/BaseController.js";

export class TrackedBugsController extends BaseController {
    constructor() {
        super('api/trackedbugs')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTrackedBug)
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