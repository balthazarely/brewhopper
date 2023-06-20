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

// Admin Routes
const addNewBrewery = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    type,
    address,
    lat,
    long,
    website,
    phone_number,
    check_in_code,
  } = req.body;
  const newBrewery = await Brewery.create({
    user: "6490e51b7d74f4333b58315c",
    name,
    description,
    type,
    address,
    lat,
    long,
    website,
    phone_number,
    check_in_code,
  });
  res.status(201).json(newBrewery);
});

const deleteBrewery = asyncHandler(async (req, res) => {
  const brewery = await Brewery.findById(req.params.id);
  if (!brewery) {
    res.status(404).json({ message: "Brewery not found" });
    return;
  }
  await brewery.deleteOne();
  res.json({ message: "Brewery removed successfully" });
});

export { getBreweryById, getBreweries, addNewBrewery, deleteBrewery };
