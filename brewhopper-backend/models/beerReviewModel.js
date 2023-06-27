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
    breweryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brewery",
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
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

beerReviewsSchema.pre("remove", async function (next) {
  console.log("Deleting beer with ID:", this._id);
  // Perform any additional operations or logic before the review is removed
  next();
});

const BeerReviews = mongoose.model("BeerReviews", beerReviewsSchema);
export default BeerReviews;
