import { Link } from "react-router-dom";
import { Brewery } from "../../../types";
import { HiLocationMarker } from "react-icons/hi";
import { CloudImage } from "../../elements";

interface AdminBreweryCardProps {
  brewery: Brewery;
  handleDeleteBrewery: (id: String, name: String) => void;
}
const imageUrl = "http://localhost:5001";

export function AdminBreweryCard({
  brewery,
  handleDeleteBrewery,
}: AdminBreweryCardProps) {
  return (
    <div className={`flex flex-col  p-2 shadow-md  rounded-lg`}>
      <div className="w-72 overflow-hidden h-40  bg-gray-300 rounded-lg relative">
        {/* <div className="border-2 h-full border-red-400 object-cover"> */}
        <CloudImage image={brewery.image} width={400} height={400} />
        {/* </div> */}

        {/* <img
          className="h-full w-full object-cover rounded-lg "
          src={`${imageUrl}${brewery.image}`}
          alt="brewery-image"
        /> */}
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
      <div className="flex ">
        <div className="font-extrabold">{brewery.name}</div>
      </div>
      <div className="flex items-center gap-1">
        <HiLocationMarker className="text-sm" />
        <div className="text-sm">{brewery.address.split(",")[0]}</div>
      </div>
      <div className="flex justify-start mt-3 gap-1">
        <Link to={`/admin/edit-brewery/${brewery._id}`} className="btn btn-xs">
          Edit
        </Link>
        <button
          onClick={() => handleDeleteBrewery(brewery._id, brewery.name)}
          className="btn btn-xs"
        >
          Delete
        </button>
        {brewery.distanceTo && (
          <div className="text-xs font bold">
            {brewery.distanceTo.toFixed(1)} miles away
          </div>
        )}
      </div>
    </div>
  );
}
