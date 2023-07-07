import { CloudImage } from "../../elements";
import { Link } from "react-router-dom";

export function NearBeweryCard({ brewery, handleCheckIn }: any) {
  return (
    <div className={` cursor-pointer flex flex-col  p-2  rounded-lg shadow  `}>
      <div className="w-32  max-h-32 h-full flex justify-center items-center overflow-hidden  bg-gray-300 rounded-lg relative">
        <CloudImage
          classes="object-cover"
          image={brewery?.image}
          width={200}
          height={200}
        />
        <div
          className={`badge-sm capitalize absolute right-2 top-2 badge  ${
            brewery.type === "brewery" && "badge-primary"
          } ${brewery.type === "winery" && "badge-warning"}`}
        >
          {brewery.type}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="font-extrabold">{brewery.name}</div>
        <div className="text-sm">{brewery.distanceTo.toFixed()} ft. away</div>
      </div>

      <div className="flex justify-between mt-2">
        <button
          onClick={() => handleCheckIn(brewery)}
          className="btn btn-primary btn-sm"
        >
          Check In
        </button>
        <Link
          className="text-xs btn-xs btn font-bold hover:text-black text-neutral"
          to={`/brewery/${brewery._id}`}
        >
          See More
        </Link>
      </div>
    </div>
  );
}
