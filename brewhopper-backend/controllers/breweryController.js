import asyncHandler from "../middleware/asyncHandler.js";
import Brewery from "../models/breweryModel.js";
import Beer from "../models/beerModel.js";

// TODO: add error handling, for getBreweryByID

const getBreweries = asyncHandler(async (req, res) => {
  const breweries = await Brewery.find({});
  res.json(breweries);
});

const getBreweryById = asyncHandler(async (req, res) => {
  const brewery = await Brewery.findById(req.params.id);
  const beers = await Beer.find({ breweryId: req.params.id });
  res.json({ breweryInfo: brewery, beers });
});

export { getBreweryById, getBreweries };
