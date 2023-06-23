import { Link } from "react-router-dom";
import { useDeletePassportBreweryMutation } from "../../../slices/passportSlice";
import { FaTrash } from "react-icons/fa";
const imageUrl = "http://localhost:5001";

export function PassportCard({ brewery }: any) {
  const [deletePassportBrewery, { isLoading: loadingDelete }] =
    useDeletePassportBreweryMutation({});
  function convertToReadableDate(createdAt: any) {
    const date = new Date(createdAt);
    const options: any = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleString("en-US", options);
  }

  const deletePassportItem = async (id: string) => {
    await deletePassportBrewery(id);
  };

  return (
    <div
      className={`cursor-pointer flex flex-col gap-1 p-2  rounded-lg shadow`}
    >
      <div className="w-full h-44  bg-gray-300 rounded-lg relative">
        <img
          className="h-full w-full object-cover rounded-md"
          src={`${imageUrl}${brewery.breweryImage}`}
          alt="brewery-image"
        />
        <div className="absolute top-0 right-0 m-2">
          <button
            className="btn btn-sm bg-opacity-60 border-none"
            onClick={() => deletePassportItem(brewery._id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="flex justify-between flex-col py-1 ">
        <Link className="" to={`/brewery/${brewery.breweryId}`}>
          <div className="font-extrabold text-lg">{brewery.breweryName}</div>
        </Link>
        <div className="text-xs">
          Visited on {convertToReadableDate(brewery.createdAt)}
        </div>
      </div>
    </div>
  );
}
