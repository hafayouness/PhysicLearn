import express from "express";
import {
  getUserProgress,
  markLessonComplete,
  getUserStats,
  getAllProgress,
} from "../Controllers/progressController.js";
import { protect, authorize } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getUserProgress);
router.get("/me/stats", protect, getUserStats);
router.post("/lesson/complete", protect, markLessonComplete);

router.get("/all", protect, authorize("admin"), getAllProgress);

export default router;
