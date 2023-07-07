import { useGetBreweriesQuery } from "../slices/brewerySlice";
import { useEffect, useState } from "react";
import { Brewery, UserLocation } from "../types";
import {
  BreweriesMap,
  BreweriesPanel,
  BreweriesFilter,
} from "../components/mapPage";
import { FullPageLoader, PageWrapper } from "../components/elements";
import { calcBreweryDistance, getUserCoordinates } from "../utils/mapFunctions";

export default function MapScreen() {
  const { data: breweries, isLoading } = useGetBreweriesQuery({});
  const [selectedBrewery, setSelectedBrewery] = useState<Brewery | null>(null);
  const [sortFilterBy, setSortFilterBy] = useState<string>("all");
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isSortingEnabled, setIsSortingEnabled] = useState<boolean>(false);

  const filteredBreweriesForPanel = breweries?.filter((brew: Brewery) => {
    if (sortFilterBy !== "all") {
      return brew.type === sortFilterBy;
    } else {
      return brew;
    }
  });

  let sortedBreweriesForPanel = filteredBreweriesForPanel;
  if (userLocation !== null) {
    sortedBreweriesForPanel = calcBreweryDistance(
      filteredBreweriesForPanel,
      userLocation.latitude,
      userLocation.longitude
    );
  }
  if (isSortingEnabled && userLocation !== null) {
    sortedBreweriesForPanel.sort((a: any, b: any) => {
      return a.distanceTo - b.distanceTo;
    });
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

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <PageWrapper>
      <BreweriesFilter
        userLocation={userLocation}
        isSortingEnabled={isSortingEnabled}
        setIsSortingEnabled={setIsSortingEnabled}
        setSortFilterBy={setSortFilterBy}
        sortFilterBy={sortFilterBy}
      />

      <div className="flex gap-6 justify-between relative ">
        <div className="w-1/2 bg-base-100 brewery-panel-map-wrapper  relative">
          <div className="overflow-y-scroll h-full pb-10">
            <BreweriesPanel
              breweries={sortedBreweriesForPanel}
              selectedBrewery={selectedBrewery}
              setSelectedBrewery={setSelectedBrewery}
            />
          </div>
          <div className="bg-gradient-to-b from-transparent to-white w-full h-10 absolute bottom-0 left-0 z-50 "></div>
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
    </PageWrapper>
  );
}
