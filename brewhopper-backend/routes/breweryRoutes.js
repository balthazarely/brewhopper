import { Router } from "express";
import {
  getBreweries,
  getBreweryById,
  addNewBrewery,
  deleteBrewery,
  updateBrewery,
  getAllBeersAtBrewery,
} from "../controllers/breweryController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(getBreweries).post(protect, admin, addNewBrewery);
router
  .route("/:id")
  .get(getBreweryById)
  .put(protect, admin, updateBrewery)
  .delete(protect, admin, deleteBrewery);
router
  .route("/:id/beers")
  .get(getAllBeersAtBrewery)
  .post(protect, addNewBrewery);

export default router;
