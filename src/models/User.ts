import mongoose, { Schema, model } from "mongoose";
// import autoIncrement from "mongoose-auto-increment";
import { flattenDiagnosticMessageText } from "typescript";

const databaseName = process.env.DATABASE_NAME;
const connection = mongoose.createConnection(
  'mongodb+srv://unicode:yslY5G8yagSMk9H7@users.lpuxk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
  }
);
mongoose.set('strictQuery', true);
// autoIncrement.initialize(connection);

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  repositoriesUrl: {
    type: String,
    requierd: true,
  },
  lessons: {
    type: Array,
    default: [
      {
        lesson: 1,
        tasks: [
          { 1: false },
          { 2: false },
          { 3: false },
          { 4: false },
          { 5: false },
          { 6: false },
          { 7: false },
          { 8: false },
          { 9: false },
          { 10: false },
          { 11: false },
        ],
      },
      {
        lesson: 2,
        tasks: [{ 1: false }, { 2: false }, { 3: false }, { 4: false }],
      },
      {
        lesson: 3,
        tasks: [
          { 1: false },
          { 2: false },
          { 3: false },
          { 4: false },
          { 5: false },
          { 6: false },
          { 7: false },
        ],
      },
      {
        lesson: 4,
        tasks: [{ 1: false }, { 2: false }, { 3: false }, { 4: false }],
      },
      {
        lesson: 5,
        tasks: [
          { 1: false },
          { 2: false },
          { 3: false },
          { 4: false },
          { 5: false },
          { 6: false },
          { 7: false },
          { 8: false },
          { 9: false },
          { 10: false },
          { 11: false },
          { 12: false },
        ],
      },
      {
        lesson: 6,
        tasks: [
          { 1: false },
          { 2: false },
          { 3: false },
          { 4: false },
          { 5: false },
          { 6: false },
          { 7: false },
          { 8: false },
          { 9: false },
          { 10: false },
          { 11: false },
          { 12: false },
          { 13: false },
        ],
      },
      {
        lesson: 7,
        tasks: [
          { 1: false },
          { 2: false },
          { 3: false },
          { 4: false },
          { 5: false },
          { 6: false },
          { 7: false },
          { 8: false },
          { 9: false },
          { 10: false },
          { 11: false },
          { 12: false },
          { 13: false },
          { 14: false },
          { 15: false },
          { 16: false },
        ],
      },
      {
        lesson: 8,
        tasks: [{ 1: false }],
      },
      {
        lesson: 9,
        tasks: [
          { 1: false },
          { 2: false },
          { 3: false },
          { 4: false },
          { 5: false },
          { 6: false },
          { 7: false },
          { 8: false },
          { 9: false },
          { 10: false },
        ],
      },
      {
        lesson: 10,
        tasks: [
          { 1: false },
          { 2: false },
          { 3: false },
          { 4: false },
          { 5: false },
          { 6: false },
          { 7: false },
          { 8: false },
          { 9: false },
        ],
      },
    ],
  },
});

// userSchema.plugin(autoIncrement.plugin, "User");

export default model("User", userSchema);
