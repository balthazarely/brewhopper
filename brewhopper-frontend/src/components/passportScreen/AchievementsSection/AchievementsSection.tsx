import { FaAward } from "react-icons/fa";
import { useGetAchievementsQuery } from "../../../slices/achievementSlice";
import { FullPageLoader } from "../../elements";
import { AchievementBreweryModal } from "..";
import { useState } from "react";

export function AchievementsSection({ userPassportData }: any) {
  const { data: achievements, isLoading: achievementsLoading } =
    useGetAchievementsQuery({});

  const [achievementToPreview, setAchievementToPreview] = useState<any>(null);
  const [achievementPreviewModalOpen, setAchievementPreviewModalOpen] =
    useState<boolean>(false);

  const userBreweriesVisited = userPassportData?.breweriesVisited?.map(
    (breweryVisit: any) => {
      return {
        name: breweryVisit.brewery.name,
        id: breweryVisit.brewery._id,
      };
    }
  );

  const uniqueUserBreweriesVisited = [
    ...new Set(userBreweriesVisited.map((brewery: any) => brewery.id)),
  ].map((id) => userBreweriesVisited.find((brewery: any) => brewery.id === id));

  const countMatchingItems = (arr1: any, arr2: any) => {
    const idsArr1 = arr1.map((item: any) => item._id);
    const matchingItems = arr2.filter((item: any) => idsArr1.includes(item.id));
    return matchingItems.length;
  };

  if (achievementsLoading) {
    return <FullPageLoader classes="h-56" />;
  }

  console.log(achievements);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
      {achievements?.map((achievement: any) => {
        return (
          <div
            key={achievement._id}
            className="p-2 border-2 border-base-200 rounded-lg shadow"
          >
            <div className="flex items-start gap-2">
              <div className=" flex flex-col h-24 w-full ">
                <div className="text-xl font-bold">{achievement.name}</div>
                <div className="flex-grow text-sm ">
                  {achievement.description}
                </div>
                <div className="flex justify-between">
                  <div className="font-bold ">
                    {countMatchingItems(
                      achievement.achivementBreweries,
                      uniqueUserBreweriesVisited
                    )}{" "}
                    / {achievement.achivementBreweries.length} completed
                  </div>
                  <button
                    onClick={() => {
                      setAchievementToPreview(achievement);
                      setAchievementPreviewModalOpen(true);
                    }}
                    className="btn btn-xs"
                  >
                    See Breweries
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <AchievementBreweryModal
        achievementToPreview={achievementToPreview}
        achievementPreviewModalOpen={achievementPreviewModalOpen}
        setAchievementPreviewModalOpen={setAchievementPreviewModalOpen}
      />
    </div>
  );
}
