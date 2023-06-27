import asyncHandler from "../middleware/asyncHandler.js";
import Beer from "../models/beerModel.js";
import Brewery from "../models/breweryModel.js";

const getBeer = asyncHandler(async (req, res) => {
  const beer = await Beer.findById(req.params.id).populate({
    path: "reviews",
    populate: {
      path: "user",
      model: "User",
      select: "name",
    },
  });
  res.status(200).json(beer);
});

const addNewBeer = asyncHandler(async (req, res) => {
  const { user, name, description, style, abv, ibu, breweryId, image } =
    req.body;
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

  const brewery = await Brewery.findById(breweryId);
  brewery.beers.push(newBeer._id);
  await brewery.save();

  res.status(200).json(newBeer);
});

const updateBeer = asyncHandler(async (req, res) => {
  const { user, name, description, style, abv, ibu, breweryId, image } =
    req.body;

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
  const { breweryId } = req.body;
  const beer = await Beer.findById(req.params.id);
  if (!beer) {
    res.status(404).json({ message: "beer not found" });
    return;
  }
  const brewery = await Brewery.findById(breweryId);
  brewery.beers = brewery.beers.filter(
    (beerId) => beerId.toString() !== req.params.id
  );

  brewery.beers = brewery.beers.filter(
    (beerId) => beerId.toString() !== "6497526e7363127fcf6fde68"
  );

  await brewery.save();
  await beer.deleteOne();
  res.json({ message: "beer removed successfully" });
});

export {
  getBeer,
  // getAllBeersAtBrewery,
  addNewBeer,
  deleteBeer,
  updateBeer,
};
