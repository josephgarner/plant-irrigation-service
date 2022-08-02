import mongoose from "mongoose";
import { CommandQueue } from "../../types";

const commandQueueSchema = new mongoose.Schema({
  planterID: {
    type: String,
    required: true,
  },
  issuedCommand: {
    type: String,
    required: true,
  },
  sent: {
    type: Boolean,
    default: false,
    required: false,
  },
  actioned: {
    type: Boolean,
    default: false,
    required: false,
  },
  updatedLast: {
    type: Date,
    required: true,
    default: new Date(),
  },
  dateCreated: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

commandQueueSchema.statics.build = (attr: CommandQueue) => {
  return new commandQueue(attr);
};

interface commandQueueaModel extends mongoose.Model<any> {
  build(attr: CommandQueue): any;
}

const commandQueue = mongoose.model<any, commandQueueaModel>(
  "CommandQueue",
  commandQueueSchema
);

export { commandQueue };
