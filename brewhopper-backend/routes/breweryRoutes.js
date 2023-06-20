import { Router } from "express";
import {
  getBreweries,
  getBreweryById,
  addNewBrewery,
  deleteBrewery,
} from "../controllers/breweryController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(getBreweries);
router.route("/add-brewery").get(protect, admin, addNewBrewery);
router.route("/:id").get(getBreweryById).delete(protect, admin, deleteBrewery);

// Admin Routes

export default router;
