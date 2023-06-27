import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { convertToReadableDate } from "../../../utils/dateFuncitons";
const imageUrl = "http://localhost:5001";

export function PassportCard({
  brewery: breweryVisitInfo,
  setPassportForDeletion,
  setConfrimActionModalOpen,
}: any) {
  return (
    <div
      className={`cursor-pointer flex flex-col gap-1 p-2  rounded-lg shadow`}
    >
      <div className="w-full h-44  bg-gray-300 rounded-lg relative">
        <img
          className="h-full w-full object-cover rounded-md"
          src={`${imageUrl}${breweryVisitInfo?.brewery?.image}`}
          alt="brewery-image"
        />
        <div className="absolute top-0 right-0 m-2">
          <button
            className="btn btn-sm bg-opacity-60 border-none"
            onClick={() => {
              setPassportForDeletion({
                id: breweryVisitInfo?._id,
                name: breweryVisitInfo?.brewery?.name,
              });
              setConfrimActionModalOpen(true);
            }}
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="flex justify-between flex-col py-1 ">
        <Link className="" to={`/brewery/${breweryVisitInfo?.brewery?._id}`}>
          <div className="font-extrabold text-lg">
            {breweryVisitInfo?.brewery?.name}
          </div>
        </Link>
        <div className="text-xs italic">
          Visited on {convertToReadableDate(breweryVisitInfo?.timestamp)}
        </div>
        <div className="flex justify-between items-end">
          <div>
            {breweryVisitInfo?.beers?.length !== 0 && (
              <>
                <div className="font-bold text-sm mt-2">Beers Sampled:</div>
                {breweryVisitInfo?.beers.map((beer: any) => {
                  return (
                    <div key={beer._id}>
                      <div className="text-xs">{beer.name}</div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
