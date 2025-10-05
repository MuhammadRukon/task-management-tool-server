import { Router, Request, Response } from "express";
import { Task } from "../model/task";
import { authenticateToken } from "../middleware/auth";

export const taskRoutes = Router();

// Get all tasks
taskRoutes.get("/", async (req: Request, res: Response) => {
  const tasks = await Task.find();

  res.json(tasks || []);
});

// Create a task
taskRoutes.post("/", authenticateToken, async (req: Request, res: Response) => {
  const task = new Task(req.body);

  await task.save();

  res.status(201).json(task);
});

// Update a task
taskRoutes.patch(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.sendStatus(200);
  }
);

// Delete a task
taskRoutes.delete(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted" });
  }
);
