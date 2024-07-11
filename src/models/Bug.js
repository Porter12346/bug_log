import { Schema } from "mongoose";

export const BugsSchema = new Schema({
    title: {type: String, minLength: 10, maxLength: 50, required: true},
    description: {type: String, minLength: 10, maxLength: 500, required: true},
    priority: {type: Number, min: 1, max: 5, required: true},
    closed: {type: Boolean, default: false, required: true},
    closedDate: {type: Date},
    creatorId: {type: Schema.ObjectId, required: true}
},
{
    toJSON: {virtuals: true}
})