import asyncHandler from "../middleware/asyncHandler.js";
import Beer from "../models/beerModel.js";
import BeerReviews from "../models/beerReviewModel.js";

const addBeerReview = asyncHandler(async (req, res) => {
  const beerReviewsData = req.body; // Assuming req.body is an array of objects
  const updatedData = [];

  for (let i = 0; i < beerReviewsData.length; i++) {
    const { review, stars, _id, breweryId, beerName, breweryName, style } =
      beerReviewsData[i];
    const beerReview = await BeerReviews.create({
      user: req.user._id,
      beerId: _id,
      beerName: beerName,
      breweryId: breweryId,
      breweryName: breweryName,
      breweryId: breweryId,
      style: style,
      review: review,
      stars: stars,
    });

    const beer = await Beer.findById(_id);
    if (beer) {
      beer.reviews.push({ _id: beerReview._id, stars: stars });
      const beerToUpdate = await beer.save();
      updatedData.push({
        beer: beerToUpdate,
      });
    } else {
      throw new Error("User or resource not found");
    }
  }

  res.json(updatedData);
});

const updateBeerReview = asyncHandler(async (req, res) => {
  const { stars, review } = req.body;
  const reviewToEdit = await BeerReviews.findById(req.params.id);
  if (reviewToEdit) {
    reviewToEdit.review = review;
    reviewToEdit.stars = stars;
    const newReview = await reviewToEdit.save();
    res.json(newReview);
  } else {
    res.status(404);
    throw new Error("resrouce not found");
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  const { beerId } = req.body;
  const reviewToDelete = await BeerReviews.findById(req.params.id);
  if (reviewToDelete) {
    await reviewToDelete.deleteOne();
    console.log("Review removed successfully");
  } else {
    ß;
    console.log("Review not found");
  }
  const beer = await Beer.findById(beerId);
  if (beer) {
    const reviewIndex = beer.reviews.findIndex(
      (review) => review._id.toString() === req.params.id
    );
    if (reviewIndex !== -1) {
      beer.reviews.splice(reviewIndex, 1);
      await beer.save();
      console.log("Review deleted successfully");
    }
  } else {
    console.log("beer wasnt found, might have already been deleted");
  }
  res.status(200).json({ message: "Review deleted successfully" });
});

const getAllReviewsByUser = asyncHandler(async (req, res) => {
  const reviews = await BeerReviews.find({ user: req.user._id })
    .populate({
      path: "beerId",
      select: ["name", "image", "style"],
    })
    .populate({
      path: "breweryId",
      select: ["name"],
    })
    .exec();
  res.status(200).json(reviews);
});

const getReviewsForBeerByUser = asyncHandler(async (req, res) => {
  const review = await BeerReviews.find({
    beerId: req.params.id,
    user: req.user._id,
  });
  res.status(200).json(review);
});

export {
  addBeerReview,
  deleteReview,
  getAllReviewsByUser,
  getReviewsForBeerByUser,
  updateBeerReview,
};
