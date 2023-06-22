import { Link } from "react-router-dom";
import { Brewery } from "../../../types";
import { HiLocationMarker } from "react-icons/hi";
import { useDeleteBreweryMutation } from "../../../slices/brewerySlice";

interface AdminBreweryCardProps {
  brewery: Brewery;
  handleDeleteBrewery: (modalState: boolean, id: String) => void;
}

export function AdminBreweryCard({
  brewery,
  handleDeleteBrewery,
}: AdminBreweryCardProps) {
  // const [deleteBrewery, { isLoading: loadingDelete }] =
  // useDeleteBreweryMutation({});

  // const handleDeleteBrewery = async (id: String) => {
  //   console.log(id);
  //   await deleteBrewery(id);
  // };

  return (
    <div className={`flex flex-col  p-2 shadow-md  rounded-lg`}>
      <div className="w-full h-32 bg-gray-300 rounded-lg relative">
        <div className="badge-sm capitalize absolute right-2 top-2 badge badge-primary">
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
          onClick={() => handleDeleteBrewery(true, brewery._id)}
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
