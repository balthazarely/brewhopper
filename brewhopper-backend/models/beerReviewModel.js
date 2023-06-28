import mongoose from "mongoose";

const beerReviewsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    beerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beer",
      required: true,
    },
    beerName: {
      type: String,
      required: true,
    },
    breweryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brewery",
      required: true,
    },
    breweryName: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const BeerReviews = mongoose.model("BeerReviews", beerReviewsSchema);
export default BeerReviews;
