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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 p-4">
      {breweries.map((brewery: any) => {
        return (
          <BreweryMapCard
            key={brewery._id}
            brewery={brewery}
            selectedBrewery={selectedBrewery}
            setSelectedBrewery={setSelectedBrewery}
          />
        );
      })}
    </div>
  );
}
