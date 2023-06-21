import { useGetBreweriesQuery } from "../slices/brewerySlice";
import { useEffect, useState } from "react";
import { Brewery } from "../types";
import {
  BreweriesMap,
  BreweriesPanel,
  BreweriesFilter,
} from "../components/homePage";
import { PageWrapper } from "../components/elements";
import {
  getUserCoordinates,
  sortBreweriesByDistance,
} from "../utils/mapFunctions";

export type UserLocation = {
  longitude: number;
  latitude: number;
};

export default function HomeScreen() {
  const { data: breweries, isLoading } = useGetBreweriesQuery({});
  const [selectedBrewery, setSelectedBrewery] = useState<Brewery | null>(null);
  const [sortFilterBy, setSortFilterBy] = useState("all");
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isSortingEnabled, setIsSortingEnabled] = useState(false);

  const filteredBreweriesForPanel = breweries?.filter((brew: Brewery) => {
    if (sortFilterBy !== "all") {
      return brew.type === sortFilterBy;
    } else {
      return brew;
    }
  });

  let sortedBreweriesForPanel = filteredBreweriesForPanel;
  if (isSortingEnabled && userLocation !== null) {
    sortedBreweriesForPanel = sortBreweriesByDistance(
      filteredBreweriesForPanel,
      userLocation.latitude,
      userLocation.longitude
    );
  }

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const userLocation = await getUserCoordinates();
        setUserLocation(userLocation);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserLocation();
  }, []);

  return (
    <PageWrapper>
      <BreweriesFilter
        userLocation={userLocation}
        isSortingEnabled={isSortingEnabled}
        setIsSortingEnabled={setIsSortingEnabled}
        setSortFilterBy={setSortFilterBy}
        sortFilterBy={sortFilterBy}
      />
      {!isLoading ? (
        <div className="flex justify-between relative">
          <div className="w-1/2 bg-base-100 ">
            <BreweriesPanel
              breweries={sortedBreweriesForPanel}
              selectedBrewery={selectedBrewery}
              setSelectedBrewery={setSelectedBrewery}
            />
          </div>
          <div
            className={`${
              selectedBrewery ? "absolute" : "hidden"
            } z-50 bottom-0 left-96 w-96 overflow-hidden `}
          ></div>
          <div className="relative w-1/2 brewery-map-wrapper overflow-hidden">
            <BreweriesMap
              breweries={breweries}
              setSelectedBrewery={setSelectedBrewery}
              selectedBrewery={selectedBrewery}
              sortFilterBy={sortFilterBy}
            />
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </PageWrapper>
  );
}
