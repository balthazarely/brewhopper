import { Link } from "react-router-dom";
import { Brewery } from "../../../types";
import { HiStar } from "react-icons/hi2";
import { HiLocationMarker } from "react-icons/hi";

interface BreweryMapCardProps {
  brewery: Brewery;
  selectedBrewery: Brewery | null;
  setSelectedBrewery: (brewery: Brewery) => void;
}

export function BreweryMapCard({
  brewery,
  selectedBrewery,
  setSelectedBrewery,
}: BreweryMapCardProps) {
  return (
    <div
      onClick={() => setSelectedBrewery(brewery)}
      className={`flex flex-col border-2 p-2 shadow rounded-lg   ${
        selectedBrewery?._id === brewery._id ? "border-2 border-black" : ""
      }`}
    >
      <div className="w-full h-32 bg-gray-300 rounded-lg"></div>
      <div className="flex justify-between">
        <div className="font-extrabold">{brewery.name}</div>
        <div className="text-sm flex items-center gap-1">
          <HiStar className="text-primary " />{" "}
          <div className="font-bold text-sm">4.2</div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <HiLocationMarker className="text-sm" />
        <div className="text-sm">{brewery.address.split(",")[0]}</div>
      </div>
      <div className="flex justify-end mt-1">
        <Link
          className="text-xs font-bold hover:text-black text-neutral"
          to={`/brewery/${brewery._id}`}
        >
          See More
        </Link>
      </div>
    </div>
  );
}
