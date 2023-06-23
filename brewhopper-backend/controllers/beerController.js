import asyncHandler from "../middleware/asyncHandler.js";
import Beer from "../models/beerModel.js";

const getAllBeersAtBrewery = asyncHandler(async (req, res) => {
  const beers = await Beer.find({ breweryId: req.params.id });
  res.status(200).json(beers);
});

const addNewBeer = asyncHandler(async (req, res) => {
  const {
    user,
    name,
    description,
    style,
    abv,
    ibu,
    breweryId,
    seasonal,
    image,
  } = req.body;

  const newBeer = await Beer.create({
    user: user,
    name: name,
    description: description,
    style: style,
    abv: abv,
    ibu: ibu,
    breweryId: breweryId,
    seasonal: seasonal,
    image: image,
  });
  res.status(200).json(newBeer);
});

const deleteBeer = asyncHandler(async (req, res) => {
  const beer = await Beer.findById(req.params.id);
  if (!beer) {
    res.status(404).json({ message: "beer not found" });
    return;
  }
  await beer.deleteOne();
  res.json({ message: "beer removed successfully" });
});

export { getAllBeersAtBrewery, addNewBeer, deleteBeer };
