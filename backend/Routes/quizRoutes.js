import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} from "../Controllers/quizController.js";

import express from "express";

import { protect, authorize } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllQuizzes);
router.get("/:id", protect, getQuizById);
router.post("/:id/submit", protect, submitQuiz);

router.post("/", protect, authorize("admin"), createQuiz);
router.put("/:id", protect, authorize("admin"), updateQuiz);
router.delete("/:id", protect, authorize("admin"), deleteQuiz);

export default router;
