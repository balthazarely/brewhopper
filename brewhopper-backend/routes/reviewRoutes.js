import { Router } from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  addBeerReview,
  //   getAllUserBeerReviews,
} from "../controllers/reviewController.js";

const router = Router();

router
  .route("/")
  //   .get(protect, getAllUserBeerReviews)
  .post(protect, addBeerReview);

export default router;
