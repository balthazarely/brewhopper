import mongoose from "mongoose";

const beers = [
  {
    name: "Tropical Pines IPA",
    id: "123",
    description: "text here",
    style: "IPA",
    abv: 6.5,
    ibu: 65,
    breweryId: new mongoose.Types.ObjectId("6490e51b7d74f4333b583160"), // Use the mongoose.Types.ObjectId() method
    seasonal: false,
  },
  {
    name: "Trade War Export Stout",
    id: "321",
    description: "text here",
    style: "Stout",
    abv: 7.5,
    ibu: 31,
    description: "text here",
    breweryId: new mongoose.Types.ObjectId("6490e51b7d74f4333b583160"), // Use the mongoose.Types.ObjectId() method
    seasonal: false,
  },
  {
    name: "Ching Ching Sour Ale",
    id: "222",
    description: "text here",
    style: "Sour Ale",
    abv: 4.5,
    ibu: 5,
    breweryId: new mongoose.Types.ObjectId("6490e51b7d74f4333b583160"), // Use the mongoose.Types.ObjectId() method
    seasonal: false,
  },

  {
    name: "Fresh Squeezed IPA",
    id: "689",
    description: "text here",
    style: "IPA",
    abv: 6.4,
    ibu: 60,
    breweryId: new mongoose.Types.ObjectId("6490e51b7d74f4333b583161"), // Use the mongoose.Types.ObjectId() method
    seasonal: false,
  },
  {
    name: "Mirror Pond Pale Ale",
    id: "679",
    description: "text here",
    style: "Pale Ale",
    abv: 5,
    ibu: 40,
    breweryId: new mongoose.Types.ObjectId("6490e51b7d74f4333b583161"), // Use the mongoose.Types.ObjectId() method
    seasonal: false,
  },
  {
    name: "Black Butte Porter",
    id: "046",
    description: "text here",
    style: "Porter",
    abv: 5.5,
    ibu: 30,
    breweryId: new mongoose.Types.ObjectId("6490e51b7d74f4333b583161"), // Use the mongoose.Types.ObjectId() method
    seasonal: false,
  },
];

export default beers;
