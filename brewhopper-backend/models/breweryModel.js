import mongoose from "mongoose";
import Beer from "../models/beerModel.js";

const brewerySchema = mongoose.Schema(
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
    type: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    check_in_code: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    logoImage: {
      type: String,
    },
    beers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beer",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Brewery = mongoose.model("Brewery", brewerySchema);
export default Brewery;
