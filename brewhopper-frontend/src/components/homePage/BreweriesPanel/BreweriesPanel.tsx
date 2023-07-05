import { Brewery } from "../../../types";
import { BreweryMapCard } from "../BreweryMapCard";

interface BreweriesPanelProps {
  breweries: Brewery[];
  selectedBrewery: Brewery | null;
  setSelectedBrewery: (brewery: Brewery) => void;
}

export function BreweriesPanel({
  breweries,
  selectedBrewery,
  setSelectedBrewery,
}: BreweriesPanelProps) {
  console.log(breweries);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 ">
      {breweries.map((brewery: Brewery) => {
        return (
          <BreweryMapCard
            key={brewery._id.toString()}
            brewery={brewery}
            selectedBrewery={selectedBrewery}
            setSelectedBrewery={setSelectedBrewery}
          />
        );
      })}
    </div>
  );
}
