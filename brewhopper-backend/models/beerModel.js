import mongoose from "mongoose";

const beerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    abv: {
      type: Number,
      required: true,
    },
    ibu: {
      type: Number,
      required: true,
    },
    breweryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Brewery",
    },
    seasonal: {
      type: Boolean,
      // required: true,
    },
    image: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Beer = mongoose.model("Beer", beerSchema);
export default Beer;
