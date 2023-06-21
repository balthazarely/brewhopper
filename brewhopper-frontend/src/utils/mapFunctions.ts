import { UserLocation } from "../screens/HomeScreen";
import { Brewery } from "../types";

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

export const getUserCoordinates = () => {
  return new Promise<UserLocation>((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: UserLocation = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          };
          resolve(userLocation);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported"));
    }
  });
};

export function calcBreweryDistance(
  breweries: Brewery[],
  lat: number,
  long: number
) {
  return breweries?.map((brewery: any) => {
    const distanceTo = calculateDistance(lat, long, brewery.lat, brewery.long);
    return { ...brewery, distanceTo };
  });
  // .sort((a: any, b: any) => {
  //   return a.distanceTo - b.distanceTo;
  // });
}
