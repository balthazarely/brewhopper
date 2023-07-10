import { useEffect, useState } from "react";
import { FullPageLoader, PageWrapper } from "../components/elements";
import { calcBreweryDistance } from "../utils/mapFunctions";
import { Brewery, UserLocation } from "../types";
import { useGetBreweriesQuery } from "../slices/brewerySlice";
import { NearBeweryCard } from "../components/homeScreen/NearBeweryCard";
import { CheckInModal } from "../components/breweryScreen";

export default function HomeScreen() {
  return (
    <PageWrapper>
      <div className="text-2xl mt-8 font-bold text-center">
        Welcome to Bend Brew Hopper
      </div>
      <div className="text-md mt-4 text-center max-w-lg mx-auto">
        Ready to achieve greatness by drinking and reviewing beers at every
        single brewery/winery/cibery in Bend, OR? This app allows you to
        check-in to locations, rate what you drank, and complete achivements in
        order to reedem coupons for free stuff. To begin, either get within 100
        feet of a brewery and a card should popup below, allowing you to check
        in. You can always go to the brewery page and click "Check In" there,
        and enter the brewery code supplied by the brewery.
        <div className="divider"></div>
      </div>
      <div className="mt-8">
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
    const { data: breweries } = useGetBreweriesQuery({});
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [sortedBreweries, setSortedBreweries] = useState<any>(null);
    const [checkInBrewries, setCheckInBrewries] = useState<any>(null);
    const [checkInModalOpen, setCheckInModalOpen] = useState(false);

    useEffect(() => {
      const fetchUserLocation = async () => {
        try {
          // const userLocation = await getUserCoordinates();
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
