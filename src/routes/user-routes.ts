import { Router, Request, Response } from "express";
import { User } from "../model/user";

export const userRoutes = Router();

// Get all tasks
userRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find({}, { password: 0 });
  res.json(users || []);
});
