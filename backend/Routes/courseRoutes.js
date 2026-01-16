import { protect, authorize } from "../Middleware/authMiddleware.js";
import express from "express";
import {
  getAllCourses,
  getCourseById,
  CreateCourse,
  updateCourse,
  deleteCourse,
} from "../Controllers/courseController.js";

const router = express.Router();

router.get("/", protect, getAllCourses);
router.get("/:id", protect, getCourseById);
router.post("/", protect, authorize("admin"), CreateCourse);
router.put("/:id", protect, authorize("admin"), updateCourse);
router.delete("/:id", protect, authorize("admin"), deleteCourse);

export default router;
