import { Schema } from "mongoose";

export const NoteSchema = new Schema({
    body: { type: String, minLength: 5, maxLength: 500, required: true},
    bugId: {type: Schema.ObjectId, required: true, ref: 'Bug'},
    creatorId: {type: Schema.ObjectId, required: true, ref: 'Account'}
}, {
    toJSON: {virtuals: true},
    timestamps: true
})

NoteSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

NoteSchema.virtual('bug', {
    localField: 'bugId',
    ref: 'Bug',
    foreignField: '_id',
    justOne: true
})