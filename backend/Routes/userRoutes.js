import express from "express";

import {
  protect,
  authorize,
  authorizeAdminOrSelf,
} from "../Middleware/authMiddleware.js";

import {
  getALLUsers,
  getUserById,
  deleteUser,
  updateUserById,
} from "../Controllers/userController.js";
const router = express.Router();

router.get("/", protect, authorize("admin"), getALLUsers);
router.get("/:id", protect, authorize("admin"), getUserById);
router.delete("/:id", protect, authorize("admin"), deleteUser);
router.put("/:id", protect, authorizeAdminOrSelf, updateUserById);
export default router;
