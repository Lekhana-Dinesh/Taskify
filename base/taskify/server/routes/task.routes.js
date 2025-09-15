import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/task.controllers.js";
import protect from "../middlewares/isAuth.js"; // JWT auth middleware

const router = express.Router();

router.get("/", protect, getTasks);
router.post("/", protect, createTask);
router.patch("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
