import { Router } from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Achievement from "../models/achievmentModel.js";

const getAllAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find({})
    .populate({
      path: "achivementBreweries",
      select: ["name", "_id"],
    })
    .exec();
  res.status(200).json(achievements);
});

const addAchievement = asyncHandler(async (req, res) => {
  const { user, name, description, achivementBreweries } = req.body;
  const achievement = await Achievement.create({
    user,
    name,
    description,
    achivementBreweries,
  });
  res.status(200).json(achievement);
});

const editAchievement = asyncHandler(async (req, res) => {
  const { user, name, description, achivementBreweries } = req.body;
  const achievement = await Achievement.findById(req.params.id);

  if (achievement) {
    achievement.user = user;
    achievement.name = name;
    achievement.description = description;
    achievement.achivementBreweries = achivementBreweries;
    const achievementToUpdate = await achievement.save();
    res.json(achievementToUpdate);
  } else {
    res.status(404);
    throw new Error("resrouce not found");
  }
});

const deleteAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findById(req.params.id);
  if (!achievement) {
    res.status(404).json({ message: "achievement not found" });
    return;
  }
  await achievement.deleteOne();
  res.json({ message: "achievement removed successfully" });
});

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
