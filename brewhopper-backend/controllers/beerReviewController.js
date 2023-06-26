import asyncHandler from "../middleware/asyncHandler.js";
import Beer from "../models/beerModel.js";
import BeerReviews from "../models/beerReviewModel.js";
import User from "../models/userModel.js";

const addBeerReview = asyncHandler(async (req, res) => {
  const { review, stars, beerId, breweryId } = req.body;
  const beerReview = await BeerReviews.create({
    user: req.user._id,
    beerId: beerId,
    breweryId: breweryId,
    review: review,
    stars: stars,
  });
  const beer = await Beer.findById(beerId);
  const user = await User.findById(req.user._id);
  if (user && beer) {
    // Update user
    user.beerReviews.push({
      reviewId: beerReview._id,
    });
    const updatedUser = await user.save();

    // Update beer
    const numberOfReviews = beer.reviews.length;
    const existingRating = beer.stars;
    let newRating;
    if (numberOfReviews > 0) {
      newRating =
        (Number(existingRating) * numberOfReviews + Number(stars)) /
        (numberOfReviews + 1);
    } else {
      newRating = stars;
    }
    beer.stars = newRating;
    beer.reviews.push(beerReview._id);
    const beerToUpdate = await beer.save();

    res.json({
      user: updatedUser,
      beer: beerToUpdate,
    });
  } else {
    res.status(404);
    throw new Error("User or resource not found");
  }
});

export { addBeerReview };
