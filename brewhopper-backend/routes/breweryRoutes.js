import { Router } from "express";
import {
  getBreweries,
  getBreweryById,
} from "../controllers/breweryController.js";

const router = Router();

router.route("/").get(getBreweries);
router.route("/:id").get(getBreweryById);
export default router;
