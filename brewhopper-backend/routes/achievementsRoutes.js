import { Router } from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  addAchievement,
  deleteAchievement,
  editAchievement,
  getAllAchievements,
} from "../controllers/achievementController.js";

const router = Router();
router
  .route("/")
  .get(protect, admin, getAllAchievements)
  .post(protect, admin, addAchievement);

router
  .route("/:id")
  .put(protect, admin, editAchievement)
  .delete(protect, admin, deleteAchievement);

export default router;
