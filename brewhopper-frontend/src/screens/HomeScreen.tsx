import { useEffect, useState } from "react";
import { FullPageLoader, PageWrapper } from "../components/elements";
import { calcBreweryDistance, getUserCoordinates } from "../utils/mapFunctions";
import { Brewery, UserLocation } from "../types";
import { useGetBreweriesQuery } from "../slices/brewerySlice";
import { NearBeweryCard } from "../components/homeScreen/NearBeweryCard";
import { CheckInModal } from "../components/breweryScreen";

export default function HomeScreen() {
  return (
    <PageWrapper>
      <div className="text-3xl mt-8 font-bold text-center">
        Welcome to Brew Hopper
      </div>
      <div className="mt-32">
        <div className="text-center text-lg font-bold mb-2">
          Breweries Close By
        </div>
        <div>
          <CloseBreweriesCards />
        </div>
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
      <div className="flex justify-center">
        {sortedBreweries?.map((brewery: Brewery) => {
          return (
            <NearBeweryCard handleCheckIn={handleCheckIn} brewery={brewery} />
          );
        })}

        <CheckInModal
          isBreweryInProximity={true}
          brewery={checkInBrewries}
          checkInModalOpen={checkInModalOpen}
          setCheckInModalOpen={setCheckInModalOpen}
        />
      </div>
    );
  }
}
