import { Link } from "react-router-dom";
import { CloudImage } from "../../elements";

export function NearBeweryCard({ brewery, handleCheckIn }: any) {
  return (
    <div className={` flex flex-col  p-2    rounded-lg shadow-xl  `}>
      <div className=" w-80  max-h-44 h-full flex justify-center items-center overflow-hidden  bg-gray-300 rounded-lg relative">
        <CloudImage
          classes="object-cover"
          image={brewery?.image}
          width={200}
          height={200}
        />
        <div
          className={`capitalize absolute right-2 top-2 badge  ${
            brewery.type === "brewery" && "badge-primary"
          } ${brewery.type === "winery" && "badge-warning"}`}
        >
          {brewery.type}
        </div>
      </div>
      <div className=" flex justify-center items-center flex-col ">
        <Link
          className="font-extrabold text-lg my-3 text-center cursor-pointer"
          to={`/brewery/${brewery._id}`}
        >
          {brewery.name}
        </Link>

        <button
          onClick={() => handleCheckIn(brewery)}
          className="btn btn-primary   w-full "
        >
          Check In
        </button>
      </div>
    </div>
  );
}
