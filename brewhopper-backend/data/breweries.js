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
  {
    name: "The Ale Apothecary",
    description:
      "Bend's only sour brewery, The Ale Apothecary, creates totally natural, barrel-aged beer using ingredients off our land or sourced nearby, direct from Oregon farms. ",
    type: "brewery",
    address: "30 SW Century Dr #140, Bend, OR 97702",
    lat: "44.051787548499355",
    long: "-121.33104877197222",
    website: "https://thealeapothecary.com/",
    phone_number: 5417976265,
    check_in_code: "ale-apothecary",
  },
  {
    name: "Boss Rambler Beer Club",
    description:
      "Bend's only sour brewery, The Ale Apothecary, creates totally natural, barrel-aged beer using ingredients off our land or sourced nearby, direct from Oregon farms. ",
    type: "brewery",
    address: "1009 NW Galveston Ave, Bend, OR 97701",
    lat: "44.056668259985216",
    long: "-121.32748508975222",
    website: "https://bossrambler.com/",
    phone_number: 5417976265,
    check_in_code: "boss-rambler",
  },

  {
    name: "Crux Fermentation Project",
    description:
      "Welcome To Crux. A brewer-owned and operated community, where passion for the craft intersects with uncompromising quality. · From hoppy pilsners to crisp IPAs",
    type: "brewery",
    address: "50 SW Division St, Bend, OR 97702",
    lat: "44.050991288892156",
    long: "-121.30796661743516",
    website: "https://www.cruxfermentation.com/",
    phone_number: 5413853333,
    check_in_code: "crux",
  },
];

export default breweries;
