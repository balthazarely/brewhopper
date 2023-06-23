import { Router } from "express";
import {
  authUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(registerUser);
// router.route("/profile").get(protect, getUserProfile);
// router.route("/add-brewery").post(protect, addBeerToUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

export default router;
