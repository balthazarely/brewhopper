import { Router } from "express";
import {
  authUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";

const router = Router();

router.route("/").post(registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

export default router;
