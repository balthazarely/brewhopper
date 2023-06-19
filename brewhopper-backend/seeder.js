import dotenv from "dotenv";
import colors from "colors";

import connectDB from "./config/db.js";
import Brewery from "./models/breweryModel.js";
import Beers from "./models/beerModel.js";
import User from "./models/userModel.js";

import breweries from "./data/breweries.js";
import users from "./data/users.js";
import beers from "./data/beers.js";

dotenv.config();
connectDB();

const importBreweryData = async () => {
  try {
    await User.deleteMany();
    await Brewery.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const breweryData = breweries.map((breweries) => {
      return { ...breweries, user: adminUser };
    });
    await Brewery.insertMany(breweryData);

    console.log("Brewery Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

const importBeerData = async () => {
  try {
    const findAdminUser = await User.findById("6490e51b7d74f4333b58315c");
    const adminUser = findAdminUser._id;
    await Beers.deleteMany();
    const beerData = beers.map((beers) => {
      return { ...beers, user: adminUser };
    });
    await Beers.insertMany(beerData);
    console.log("Beer Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Brewery.deleteMany();
    await Beers.deleteMany();
    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-destroy") {
  destroyData();
}
if (process.argv[2] === "-brew") {
  importBreweryData();
}
if (process.argv[2] === "-beer") {
  importBeerData();
}
