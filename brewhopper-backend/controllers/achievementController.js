import asyncHandler from "../middleware/asyncHandler.js";
import Achievement from "../models/achievmentModel.js";
import User from "../models/userModel.js";

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
  const achievementId = req.params.id;
  const achievement = await Achievement.findById(achievementId);
  if (!achievement) {
    res.status(404).json({ message: "Achievement not found" });
    return;
  }

  await achievement.deleteOne();

  res.json({ message: "Achievement removed successfully" });
});

export {
  getAllAchievements,
  editAchievement,
  addAchievement,
  deleteAchievement,
};
