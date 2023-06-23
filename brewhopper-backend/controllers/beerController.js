import asyncHandler from "../middleware/asyncHandler.js";
import Brewery from "../models/breweryModel.js";
import Beer from "../models/beerModel.js";

const getAllBeers = asyncHandler(async (req, res) => {
  const beers = await Beer.find({});
  res.json(beers);
});

const addNewBeer = asyncHandler(async (req, res) => {
  const { user, name, description, style, abv, ibu, breweryId, seasonal } =
    req.body;

  const newBeer = await Brewery.create({
    user: user,
    name: name,
    description: description,
    style: style,
    abv: abv,
    ibu: ibu,
    breweryId: breweryId,
    seasonal: seasonal,
  });
  res.status(200).json(newBeer);
});

export { getAllBeers, addNewBeer };
