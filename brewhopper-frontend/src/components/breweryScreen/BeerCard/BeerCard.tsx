import { Link } from "react-router-dom";
import { Beer } from "../../../types";
import { CloudImage } from "../../elements";

interface BeerProps {
  beer: Beer;
}

export function BeerCard({ beer }: BeerProps) {
  return (
    <div
      className="flex  bg-white items-center gap-1 flex-col  rounded-lg "
      key={beer._id}
    >
      <div className="w-32 flex justify-center items-center h-32 overflow-hidden  mt-2 rounded-lg relative">
        <CloudImage
          classes="object-contain"
          image={beer.image}
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
