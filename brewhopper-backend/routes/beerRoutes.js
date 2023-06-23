import { Router } from "express";
import {
  getBreweries,
  getBreweryById,
  addNewBrewery,
  deleteBrewery,
  updateBrewery,
} from "../controllers/breweryController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(getAllBeers).post(protect, admin, addNewBeer);
// router
//   .route("/:id")
//   .get(getBreweryById)
//   .put(protect, admin, updateBrewery)
//   .delete(protect, admin, deleteBrewery);

export default router;
