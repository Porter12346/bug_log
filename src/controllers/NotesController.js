import auth0provider, { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";



export class NotesController extends BaseController {
    constructor(){
        super('api/notes')
            this.router
                .use(Auth0Provider.getAuthorizedUserInfo)
                .post('', this.createNote)
                .delete('/:noteId', this.destroyNote)
    }
    async destroyNote(request, response, next) {
        try {
            const noteId = request.params.noteId
            const user = request.userInfo
            const note = await notesService.destroyNote(noteId, user.id)
            response.send(note)
        } catch (error) {
            next(error)
        }
    }
    async createNote(request, response, next) {
        try {
            const noteData = request.body
            const user = request.userInfo
            noteData.creatorId = user.id
            const note = await notesService.createNote(noteData)
            response.send(note)
        } catch (error) {
            next(error)
        }
    }


}