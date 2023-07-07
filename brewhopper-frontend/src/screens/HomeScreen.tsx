import { useEffect, useState } from "react";
import {
  CloudImage,
  FullPageLoader,
  PageWrapper,
} from "../components/elements";
import { calcBreweryDistance, getUserCoordinates } from "../utils/mapFunctions";
import { Brewery, UserLocation } from "../types";
import { Link, useLocation } from "react-router-dom";
import { useGetBreweriesQuery } from "../slices/brewerySlice";
import { BreweryMapCard } from "../components/mapPage";
import { HiStar } from "react-icons/hi2";
import { HiLocationMarker } from "react-icons/hi";
import { NearBeweryCard } from "../components/homeScreen/NearBeweryCard";
import { CheckInModal } from "../components/breweryScreen";

export default function HomeScreen() {
  return (
    <PageWrapper>
      <div className="text-3xl font-bold">Welcome to Brew Hopper</div>
      <div className="mt-32">
        <div className="text-center">What's close?</div>
        <CloseBreweriesCards />
      </div>
    </PageWrapper>
  );

  function CloseBreweriesCards() {
    const { data: breweries, isLoading } = useGetBreweriesQuery({});
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [sortedBreweries, setSortedBreweries] = useState<any>(null);
    const [checkInBrewries, setCheckInBrewries] = useState<any>(null);
    const [checkInModalOpen, setCheckInModalOpen] = useState(false);

    useEffect(() => {
      const fetchUserLocation = async () => {
        try {
          const userLocation = await getUserCoordinates();
          const testCoords = {
            latitude: 44.05960988591935,
            longitude: -121.3115202399456,
          };

          setUserLocation(testCoords);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserLocation();
    }, []);

    useEffect(() => {
      if (userLocation && breweries) {
        const sortedBreweriesForPanel = calcBreweryDistance(
          breweries,
          userLocation.latitude,
          userLocation.longitude
        )
          .sort((a: any, b: any) => a.distanceTo - b.distanceTo)
          .filter((brewery: any) => brewery.distanceTo < 150);

        setSortedBreweries(sortedBreweriesForPanel);
      }
    }, [userLocation, breweries]);

    const handleCheckIn = (brewery: any) => {
      setCheckInBrewries(brewery);
      setCheckInModalOpen(true);
    };

    if (!userLocation && !sortedBreweries) {
      return (
        <div>
          <FullPageLoader />
        </div>
      );
    }
    return (
      <div className="grid grid-cols-3 gap-4 px-4 ">
        {sortedBreweries?.map((brewery: Brewery) => {
          return (
            <NearBeweryCard handleCheckIn={handleCheckIn} brewery={brewery} />
          );
        })}

        <CheckInModal
          brewery={checkInBrewries}
          checkInModalOpen={checkInModalOpen}
          setCheckInModalOpen={setCheckInModalOpen}
        />
      </div>
    );
  }
}
