import { Link } from "react-router-dom";
import { Brewery } from "../../../types";
import { HiStar } from "react-icons/hi2";
import { HiLocationMarker } from "react-icons/hi";

interface BreweryMapCardProps {
  brewery: Brewery;
  selectedBrewery: Brewery | null;
  setSelectedBrewery: (brewery: Brewery) => void;
}

const imageUrl = "http://localhost:5001";

export function BreweryMapCard({
  brewery,
  selectedBrewery,
  setSelectedBrewery,
}: BreweryMapCardProps) {
  return (
    <div
      onClick={() => setSelectedBrewery(brewery)}
      className={` cursor-pointer flex flex-col  p-2  rounded-lg   ${
        selectedBrewery?._id === brewery._id ? "shadow-lg " : "shadow"
      }`}
    >
      <div className="w-full h-32  bg-gray-300 rounded-lg relative">
        <img
          className="h-full w-full object-cover rounded-md"
          src={`${imageUrl}${brewery.image}`}
          alt="brewery-image"
        />
        <div
          className={`badge-sm capitalize absolute right-2 top-2 badge  ${
            brewery.type === "brewery" && "badge-primary"
          }
          ${brewery.type === "winery" && "badge-warning"}
         `}
        >
          {brewery.type}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="font-extrabold">{brewery.name}</div>
        <div className="text-sm flex items-center gap-1">
          <HiStar className="text-primary " />{" "}
          <div className="font-bold text-sm">4.2</div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <HiLocationMarker className="text-sm text-primary" />
        <div className="text-sm">{brewery.address.split(",")[0]}</div>
      </div>
      <div className="flex justify-between mt-2">
        <Link
          className="text-xs font-bold hover:text-black text-neutral"
          to={`/brewery/${brewery._id}`}
        >
          See More
        </Link>
        {brewery.distanceTo && (
          <div className="text-xs font bold">
            {brewery.distanceTo.toFixed(1)} miles away
          </div>
        )}
      </div>
    </div>
  );
}
