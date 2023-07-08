import { FaAward } from "react-icons/fa";

export function AdminAchievementCard({
  achievement,
  handleDeleteAchievement,
  handleEditAchievement,
}: any) {
  return (
    <div className={`flex flex-col  p-2 shadow-md  rounded-lg`}>
      <div className="flex items-center gap-1">
        <FaAward />
        <div className="font-bold">{achievement.name}</div>
      </div>
      <div className="flex items-center gap-1"></div>
      <div>
        {achievement?.achivementBreweries?.map((brewery: any) => {
          return (
            <div className="text-xs" key={brewery._id}>
              {brewery.name}
            </div>
          );
        })}
      </div>
      <div className="flex justify-start mt-3 gap-1">
        <button
          onClick={() => handleEditAchievement(achievement)}
          className="btn btn-xs"
        >
          Edit
        </button>
        <button
          onClick={() =>
            handleDeleteAchievement(achievement._id, achievement.name)
          }
          className="btn btn-xs"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
