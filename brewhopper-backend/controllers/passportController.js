import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      breweriesVisited: user.breweriesVisited,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const addBeerToPassport = asyncHandler(async (req, res) => {
  const { breweryId, breweryName, breweryImage } = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    user.breweriesVisited.push({
      breweryId: breweryId,
      breweryName: breweryName,
      breweryImage: breweryImage,
    });
    const udpatedUser = await user.save();
    res.json(udpatedUser);
  }
});

const removeBeerFromPassport = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    const index = user.breweriesVisited.findIndex(
      (breweryVisited) => breweryVisited._id.toString() === _id.toString()
    );

    if (index !== -1) {
      user.breweriesVisited.splice(index, 1);
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error("Beer not found in breweriesVisited");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { getUserProfile, addBeerToPassport, removeBeerFromPassport };
