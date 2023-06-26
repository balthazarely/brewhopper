import { Router } from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import { addBeerReview } from "../controllers/beerReviewController.js";

const router = Router();

router.route("/:id").post(protect, admin, addBeerReview);

export default router;
