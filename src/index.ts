import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { taskRoutes } from "./routes/task-routes";
import { authRoutes } from "./routes/auth-routes";
import "dotenv/config";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wgk6h9w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

connectDB();

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
