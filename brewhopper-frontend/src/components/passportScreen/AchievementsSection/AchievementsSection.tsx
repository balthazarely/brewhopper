import { useGetAchievementsQuery } from "../../../slices/achievementSlice";
import { FullPageLoader } from "../../elements";

export function AchievementsSection({ userPassportData }: any) {
  const { data: achievements, isLoading: achievementsLoading } =
    useGetAchievementsQuery({});

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

  return (
    <div className="flex gap-2 mt-4">
      {achievements?.map((achievement: any) => {
        return (
          <div
            key={achievement._id}
            className="p-2 border-2 border-base-200 shadow"
          >
            <div>{achievement.name}</div>

            <div>
              {achievement?.achivementBreweries?.map((brewery: any) => {
                return (
                  <div className="text-xs" key={brewery._id}>
                    {brewery.name}
                  </div>
                );
              })}
            </div>
            <div className="font-bold ">
              {countMatchingItems(
                achievement.achivementBreweries,
                uniqueUserBreweriesVisited
              )}{" "}
              out of {achievement.achivementBreweries.length} completed
            </div>
          </div>
        );
      })}
    </div>
  );
}
