import { Link } from "react-router-dom";
import { convertToReadableDate } from "../../../utils/dateFuncitons";
import { CloudImage } from "../../elements";

// interface PassportCardProps {
//   brewery: any;
//   setPassportForDeletion: {
//     id: string;
//     name: string;
//   };
//   setConfrimActionModalOpen: (state: boolean) => void;
// }

export function PassportCard({
  brewery: breweryVisitInfo,
  setPassportForDeletion,
  setConfrimActionModalOpen,
}: any) {
  return (
    <div className={`flex flex-col gap-1 p-2 rounded-lg shadow`}>
      <div className="w-full h-44  flex justify-center items-center overflow-hidden  bg-gray-300 rounded-lg relative">
        <CloudImage
          classes=" object-cover "
          image={breweryVisitInfo?.brewery?.image}
          width={400}
          height={300}
        />
      </div>
      <div className="flex justify-between flex-col py-1   ">
        <div>
          <Link
            className="font-extrabold text-lg"
            to={`/brewery/${breweryVisitInfo?.brewery?._id}`}
          >
            {breweryVisitInfo?.brewery?.name}
          </Link>
          <div className="text-xs italic">
            Visited on {convertToReadableDate(breweryVisitInfo?.timestamp)}
          </div>
        </div>
        <div className="2 flex justify-between items-end">
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
          <div>
            <button
              className="btn btn-xs join-item"
              onClick={() => {
                setPassportForDeletion({
                  id: breweryVisitInfo?._id,
                  name: breweryVisitInfo?.brewery?.name,
                });
                setConfrimActionModalOpen(true);
              }}
            >
              Delete
            </button>
            {/* <button disabled className="btn btn-xs join-item">
              Edit
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
