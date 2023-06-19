import mongoose from "mongoose";

const breweries = [
  {
    name: "Bend Brewing",
    description:
      "Welcome to Bend Brewing Co. We were established in 1995, and are the second oldest brew pub in Bend, Oregon. We have a rich history of award winning craft beer brewed at our landmark location in Downtown Bend.",
    type: "brewery",
    address: "1019 NW Brooks St, Bend, OR 97701",
    lat: "44.06044219011379",
    long: "-121.31387128719689",
    website: "https://www.bendbrewingco.com/",
    phone_number: 5413831599,
    check_in_code: "bend-brewing",
  },
  {
    name: "Deschutes Brewery",
    description:
      "Deschutes Brewery is an award winning craft beer and hand crafted ales in Oregon. Over the years, Deschutes Brewery has expanded beyond the original pub.",
    type: "brewery",
    address: "1044 NW Bond St, Bend, OR 97701",
    lat: "44.05958088024505",
    long: "-121.31145655432383",
    website: "https://www.deschutesbrewery.com/",
    phone_number: 5413829242,
    check_in_code: "deschutes-brewing",
  },
];

export default breweries;
