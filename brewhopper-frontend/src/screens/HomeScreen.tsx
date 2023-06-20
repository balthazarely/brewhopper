import { useGetBreweriesQuery } from "../slices/brewerySlice";
import { useState } from "react";
import { Brewery } from "../types";
import { BreweriesMap, BreweriesPanel } from "../components/homePage";

export default function HomeScreen() {
  const { data: breweries, isLoading } = useGetBreweriesQuery({});
  const [selectedBrewery, setSelectedBrewery] = useState<Brewery | null>(null);

  return (
    <>
      {!isLoading ? (
        <div className="flex justify-between  relative">
          <div className="w-1/2 bg-base-200 ">
            <BreweriesPanel
              breweries={breweries}
              selectedBrewery={selectedBrewery}
              setSelectedBrewery={setSelectedBrewery}
            />
          </div>
          <div
            className={`${
              selectedBrewery ? "absolute" : "hidden"
            } z-50 bottom-0 left-96 w-96 overflow-hidden bg-base-300`}
          ></div>
          <div className="relative w-1/2 brewery-map-wrapper overflow-hidden">
            <BreweriesMap
              breweries={breweries}
              setSelectedBrewery={setSelectedBrewery}
              selectedBrewery={selectedBrewery}
            />
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
