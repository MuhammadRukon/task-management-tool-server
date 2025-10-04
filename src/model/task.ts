import { Schema, model } from "mongoose";

export interface ITask {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "complete";
  dueDate: Date;
  assignedUser: string;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "in-progress", "complete"],
    default: "pending",
  },
  dueDate: { type: Date, required: true },
  assignedUser: { type: String, required: true },
});

export const Task = model<ITask>("Task", taskSchema);
