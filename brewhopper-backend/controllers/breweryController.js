import asyncHandler from "../middleware/asyncHandler.js";
import Brewery from "../models/breweryModel.js";
import Beer from "../models/beerModel.js";

const getBreweries = asyncHandler(async (req, res) => {
  const breweries = await Brewery.find({})
    .populate({
      path: "beers",
      populate: {
        path: "reviews",
        model: "BeerReviews",
      },
    })
    .exec();

  res.json(breweries);
});

const getBreweryById = asyncHandler(async (req, res) => {
  const brewery = await Brewery.findById(req.params.id)
    .populate({
      path: "beers",
      populate: {
        path: "reviews",
        model: "BeerReviews",
      },
    })
    .exec();
  res.json(brewery);
});

const getAllBeersAtBrewery = asyncHandler(async (req, res) => {
  const beers = await Beer.find({ breweryId: req.params.id });
  res.status(200).json(beers);
});

// Admin Routes
const addNewBrewery = asyncHandler(async (req, res) => {
  const {
    user,
    name,
    description,
    type,
    address,
    city,
    state,
    zip,
    lat,
    long,
    website,
    phoneNumber,
    checkInCode,
  } = req.body;

  const newBrewery = await Brewery.create({
    user: user,
    name: name,
    description: description,
    type: type,
    address: address,
    city: city,
    state: state,
    zip: zip,
    lat: lat,
    long: long,
    website: website,
    phone_number: phoneNumber,
    check_in_code: checkInCode,
  });
  res.status(200).json(newBrewery);
});

const updateBrewery = asyncHandler(async (req, res) => {
  const {
    user,
    name,
    description,
    type,
    address,
    city,
    state,
    zip,
    lat,
    long,
    website,
    phoneNumber,
    checkInCode,
    image,
    logoImage,
  } = req.body;

  const brewery = await Brewery.findById(req.params.id);
  if (brewery) {
    brewery.user = user;
    brewery.name = name;
    brewery.description = description;
    brewery.type = type;
    brewery.address = address;
    brewery.city = city;
    brewery.state = state;
    brewery.zip = zip;
    brewery.lat = lat;
    brewery.long = long;
    brewery.website = website;
    brewery.phone_number = phoneNumber;
    brewery.check_in_code = checkInCode;
    brewery.image = image;
    brewery.logoImage = logoImage;
    const updatedBrewery = await brewery.save();
    res.json(updatedBrewery);
  } else {
    res.status(404);
    throw new Error("resrouce not found");
  }
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

export {
  getAllBeersAtBrewery,
  getBreweryById,
  getBreweries,
  addNewBrewery,
  updateBrewery,
  deleteBrewery,
};
