import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class NotesService {
    async destroyNote(noteId, id) {
        const note = await dbContext.Notes.findById(noteId)
        if (!note){
            throw new BadRequest("Unable to find note.")
        }
        if (note.creatorId != id){
            throw new Forbidden ('AHHHHHHHHHHH!')
        } 
        await note.deleteOne()
        return `Note has been deleted.`
    }
    getNotesByBugId(bugIdToSearch) {
        const notes = dbContext.Notes.find({ bugId: bugIdToSearch })
        return notes
    }
    async createNote(noteData) {
        const note = await dbContext.Notes.create(noteData)
        await note.populate('creator bug')
        return note
    }

}

export const notesService = new NotesService()