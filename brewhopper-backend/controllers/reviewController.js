import asyncHandler from "../middleware/asyncHandler.js";
import Beer from "../models/beerModel.js";
import BeerReviews from "../models/beerReviewModel.js";
import User from "../models/userModel.js";

const addBeerReview = asyncHandler(async (req, res) => {
  const beerReviewsData = req.body; // Assuming req.body is an array of objects
  const updatedData = [];

  for (let i = 0; i < beerReviewsData.length; i++) {
    const { review, stars, _id, breweryId } = beerReviewsData[i];

    const beerReview = await BeerReviews.create({
      user: req.user._id,
      beerId: _id,
      breweryId: breweryId,
      review: review,
      stars: stars,
    });

    const beer = await Beer.findById(_id);
    const user = await User.findById(req.user._id);

    if (user && beer) {
      user.beerReviews.push({
        reviewId: beerReview._id,
      });
      const updatedUser = await user.save();

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

      updatedData.push({
        user: updatedUser,
        beer: beerToUpdate,
      });
    } else {
      throw new Error("User or resource not found");
    }
  }

  res.json(updatedData);
});

// const getAllUserBeerReviews = asyncHandler(async (req, res) => {
//   const userReviews = await BeerReviews.find({ user: req.user._id });
//   res.json(userReviews);
// });
export { addBeerReview };
