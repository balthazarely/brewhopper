import { Router } from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  addNewBeer,
  deleteBeer,
  updateBeer,
  getBeer,
} from "../controllers/beerController.js";

const router = Router();

router.route("/").post(protect, admin, addNewBeer);
router
  .route("/:id")
  .get(getBeer)
  .delete(protect, admin, deleteBeer)
  .put(protect, admin, updateBeer);

export default router;
