import { Router } from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Achievement from "../models/achievmentModel.js";

const getAllAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find({});
  res.status(200).json(achievements);
});

const addAchievement = asyncHandler(async (req, res) => {
  const { user, name, description } = req.body;
  const achievement = await Achievement.create({
    user,
    name,
    description,
  });
  res.status(200).json(achievement);
});

const router = Router();
router
  .route("/")
  .get(protect, admin, getAllAchievements)
  .post(protect, admin, addAchievement);

export default router;
