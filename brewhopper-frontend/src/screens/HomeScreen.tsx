import BrewMap from "../components/BrewMap";
import { useGetBreweriesQuery } from "../slices/brewerySlice";
import { BreweryMapCard } from "../components/elements";
import { useState } from "react";
import { Brewery } from "../types";

export default function HomeScreen() {
  const { data: breweries, isLoading } = useGetBreweriesQuery({});
  const [selectedBrewery, setSelectedBrewery] = useState<Brewery | null>();

  return (
    <>
      {!isLoading ? (
        <div className="flex justify-between border-2 border-blue-500">
          <div className="relative w-1/3  overflow-hidden bg-base-200">
            <div>selected: {selectedBrewery?.name}</div>
            {breweries.map((brewery: any) => {
              return <BreweryMapCard key={brewery._id} brewery={brewery} />;
            })}
          </div>
          <div className="relative w-2/3 brewery-map-wrapper overflow-hidden">
            <BrewMap
              breweries={breweries}
              setSelectedBrewery={setSelectedBrewery}
            />
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
