import { Router } from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  addAchievement,
  createCoupon,
  deleteAchievement,
  editAchievement,
  getAllAchievements,
  getAllUserCoupons,
  getCouponById,
  redeemCoupon,
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

router
  .route("/coupon")
  .get(protect, getAllUserCoupons)
  .post(protect, createCoupon);

router
  .route("/coupon/:id")
  .get(protect, getCouponById)
  .put(protect, redeemCoupon);

export default router;
