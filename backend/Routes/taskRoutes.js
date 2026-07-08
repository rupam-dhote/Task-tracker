import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.post("/create-task", protect, createTask);
taskRouter.delete("/delete-task/:id", protect, deleteTask);
taskRouter.put("/update-task/:id", protect, updateTask);

export default taskRouter;
