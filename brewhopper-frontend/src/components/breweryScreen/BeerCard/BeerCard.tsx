import { Link } from "react-router-dom";
import { Beer } from "../../../types";
import { CloudImage } from "../../elements";

export function BeerCard({ beer }: { beer: Beer }) {
  return (
    <div
      className="flex w-56 bg-white items-center gap-1 flex-col  rounded-lg "
      key={beer._id}
    >
      <div className="w-32 flex justify-center items-center h-32 overflow-hidden  mt-2 rounded-lg relative">
        <CloudImage
          classes="object-contain"
          image={beer.image ? beer.image : "beer-image-1688862256255"}
          width={120}
          height={120}
        />
      </div>
      <Link to={`/beer/${beer._id}`}>
        <div className="font-bold mx-2 text-center text-sm">{beer.name}</div>
      </Link>
      {/* {beer.stars && (
        <div className="font-bold mx-2 text-center text-sm">
          {beer.stars} stars
        </div>
      )} */}
    </div>
  );
}
