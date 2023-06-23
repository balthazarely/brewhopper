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

    image: image,
  });
  res.status(200).json(newBeer);
});

const updateBeer = asyncHandler(async (req, res) => {
  const {
    user,
    name,
    description,
    style,
    abv,
    ibu,
    breweryId,

    image,
  } = req.body;

  const beer = await Beer.findById(req.params.id);

  if (beer) {
    beer.user = user;
    beer.name = name;
    beer.description = description;
    beer.style = style;
    beer.abv = abv;
    beer.ibu = ibu;
    beer.breweryId = breweryId;
    beer.image = image;
    const beerToUpdate = await beer.save();
    res.json(beerToUpdate);
  } else {
    res.status(404);
    throw new Error("resrouce not found");
  }
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

export { getAllBeersAtBrewery, addNewBeer, deleteBeer, updateBeer };
