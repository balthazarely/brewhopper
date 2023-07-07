import { Link } from "react-router-dom";

export function AdminAchievementCard({ achievement }: any) {
  return (
    <div className={`flex flex-col  p-2 shadow-md  rounded-lg`}>
      <div className="flex ">
        <div className="font-bold">{achievement.name}</div>
      </div>
      <div className="flex items-center gap-1"></div>
      <div className="flex justify-start mt-3 gap-1">
        <Link
          to={`/admin/edit-brewery/${achievement._id}`}
          className="btn btn-xs"
        >
          Edit
        </Link>
        <button
          // onClick={() => handleDeleteBrewery(brewery._id, brewery.name)}
          className="btn btn-xs"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
