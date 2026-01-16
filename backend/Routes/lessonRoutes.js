import express from "express";
import {
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} from "../Controllers/lessonController.js";
import { protect, authorize } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllLessons);
router.get("/:id", protect, getLessonById);
router.post("/", protect, authorize("admin"), createLesson);
router.put("/:id", protect, authorize("admin"), updateLesson);
router.delete("/:id", protect, authorize("admin"), deleteLesson);
export default router;
