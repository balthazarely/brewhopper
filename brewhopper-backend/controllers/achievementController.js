import asyncHandler from "../middleware/asyncHandler.js";
import Achievement from "../models/achievmentModel.js";
import Coupon from "../models/couponModel.js";
import User from "../models/userModel.js";
import QRCode from "qrcode";
import path from "path";
import mongoose from "mongoose";

const getAllAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find({})
    .populate({
      path: "achivementBreweries",
      select: ["name", "_id", "logoImage"],
    })
    .exec();
  res.status(200).json(achievements);
});

const addAchievement = asyncHandler(async (req, res) => {
  const { user, name, prize, description, achivementBreweries } = req.body;
  const achievement = await Achievement.create({
    user,
    name,
    description,
    prize,
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

const createCoupon = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const { achievement, prize } = req.body;
  const coupon = await Coupon.create({
    prize,
    user,
    achievement,
  });

  const couponId = coupon._id;
  const qrCodeData = `http://localhost:5173/admin/redeem-coupon/?id=${couponId}`;
  const qrCode = await QRCode.toDataURL(qrCodeData);
  coupon.qrCode = qrCode;
  await coupon.save();

  res.status(200).json(coupon);
});

const getAllUserCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({
    user: req.user._id,
  });

  if (coupons) {
    res.json(coupons);
  } else {
    res.status(404);
    throw new Error("coupons not found");
  }
});

const getCouponById = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (coupon) {
    res.json(coupon);
  } else {
    res.status(404);
    throw new Error("coupon not found");
  }
});

const redeemCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (coupon) {
    coupon.isActive = false;
    const updatedCoupon = await coupon.save();
    res.json(updatedCoupon);
  } else {
    res.status(404);
    throw new Error("coupon not found");
  }
});

export {
  getAllAchievements,
  editAchievement,
  addAchievement,
  deleteAchievement,
  createCoupon,
  getAllUserCoupons,
  getCouponById,
  redeemCoupon,
};
