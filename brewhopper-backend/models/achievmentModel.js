import mongoose from "mongoose";

const achievementModelSchema = mongoose.Schema(
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
    achivementBreweries: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brewery",
    },
    achivementBeers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beer",
    },
  },
  {
    timestamps: true,
  }
);

const Achievement = mongoose.model("Achievement", achievementModelSchema);
export default Achievement;
