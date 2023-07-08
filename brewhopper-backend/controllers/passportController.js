import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Achievement from "../models/achievmentModel.js";

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate({
      path: "breweriesVisited",
      populate: {
        path: "brewery",
        model: "Brewery",
      },
    })
    .populate({
      path: "breweriesVisited.beers",
      model: "Beer",
    })
    .select("-password -updatedAt")
    .exec();

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const addBeerToPassport = asyncHandler(async (req, res) => {
  const { breweryId, beers } = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    user.breweriesVisited.push({
      brewery: breweryId,
      beers: beers,
      timestamp: new Date(),
    });

    const updatedUser = await user.save();
    res.json(updatedUser);
  }
});

const removeBeerFromPassport = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  console.log(_id);
  const user = await User.findById(req.user._id);
  if (user) {
    user.breweriesVisited = user.breweriesVisited.filter(
      (visited) => visited._id.toString() !== _id
    );
    await user.save();
    res.json({ message: "Beer removed from passport" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { getUserProfile, addBeerToPassport, removeBeerFromPassport };
