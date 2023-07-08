import { Router } from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  addBeerReview,
  deleteReview,
  getAllReviewsByUser,
  getReviewsForBeerByUser,
  updateBeerReview,
} from "../controllers/beerReviewController.js";

const router = Router();

router
  .route("/")
  .get(protect, getAllReviewsByUser)
  .post(protect, addBeerReview);
router
  .route("/:id")
  .get(protect, getReviewsForBeerByUser)
  .put(protect, updateBeerReview)
  .delete(protect, deleteReview);

export default router;
