import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import cors from "cors";
import userRouter from "./Routes/userRoutes.js";
import taskRouter from "./Routes/taskRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

// database connecting
await connectDB();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// using routes for the user and task
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.listen(PORT, () => {
  console.log("server is runing on PORT : ", PORT);
});
