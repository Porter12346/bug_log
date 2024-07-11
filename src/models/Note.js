import { Schema } from "mongoose";

export const NoteSchema = new Schema({
    body: { type: String, minLength: 5, maxLength: 500, required: true},
    bugId: {type: Schema.ObjectId, required: true},
    creatorId: {type: Schema.ObjectId, required: true}
}, {
    toJSON: {virtuals: true},
    timestamps: true
})