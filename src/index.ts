import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import { taskRoutes } from "./routes/task-routes";
import { authRoutes } from "./routes/auth-routes";
import "dotenv/config";
import { userRoutes } from "./routes/user-routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [process.env.LOCAL_CLIENT!, process.env.REMOTE_CLIENT!],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wgk6h9w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      { dbName: "task-management-tool" }
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

connectDB();

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
