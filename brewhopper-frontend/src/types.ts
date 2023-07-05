export interface UserPassport {
  breweriesVisited: any[];
  createdAt: string;
  email: string;
  isAdmin: boolean;
  name: string;
}

export interface BreweriesVisited {
  beers: Beer[];
  brewery: Brewery[];
  timestamp: string;
  _id: string;
}

export interface Brewery {
  name: string;
  description: string;
  type: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  lat: string;
  long: string;
  website: string;
  phone_number: number;
  check_in_code: string;
  user: string;
  _id: string;
  distanceTo?: number;
  image?: string;
  logoImage?: string;
  beers?: any[];
  updatedAt: string;
}

export interface Beer {
  _id: string;
  user: string;
  name: string;
  description: string;
  style: string;
  abv: number;
  ibu: number;
  breweryId: string;
  image: string;
  reviews: ReviewShort[];
  createdAt: string;
  updatedAt: string;
}

export type UserLocation = {
  longitude: number;
  latitude: number;
};

export type Review = {
  user: string;
  beerId: {
    name: string;
    image: string;
    style: string;
    _id: string;
  };
  beerName: string;
  breweryId: {
    name: string;
    _id: string;
  };
  breweryName: string;
  review: string;
  stars: number;
  style: string;
  timestamp: string;
  _id: string;
};

export type ReviewShort = {
  _id: string;
  stars: number;
};
