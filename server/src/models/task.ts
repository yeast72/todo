import mongoose, { Schema, Document } from "mongoose";

export interface Task extends Document {
  title: string;
  isComplete?: boolean;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  isComplete: { type: Boolean, required: false, default: false }
});

export default mongoose.model<Task>("task", TaskSchema);
