import { Router } from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  addNewBeer,
  getAllBeersAtBrewery,
  deleteBeer,
  updateBeer,
} from "../controllers/beerController.js";

const router = Router();

router.route("/").post(protect, admin, addNewBeer);
router
  .route("/:id")
  .get(getAllBeersAtBrewery)
  .delete(protect, admin, deleteBeer)
  .put(protect, admin, updateBeer);

export default router;
