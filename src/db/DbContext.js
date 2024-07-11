import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { BugsSchema } from '../models/Bug.js';
import { NoteSchema } from '../models/Note.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bug', BugsSchema);
  Notes = mongoose.model('Note', NoteSchema);
}

export const dbContext = new DbContext()
