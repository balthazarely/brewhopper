import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  addBeerToPassport,
  removeBeerFromPassport,
} from "../controllers/passportController.js";

const router = Router();

router.route("/").get(protect, getUserProfile);
router
  .route("/add-beer")
  .post(protect, addBeerToPassport)
  .delete(protect, removeBeerFromPassport);

// router.post("/auth", authUser);
// router.post("/logout", logoutUser);

export default router;
