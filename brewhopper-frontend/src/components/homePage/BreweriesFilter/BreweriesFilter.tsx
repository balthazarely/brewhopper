import { PageWrapper } from "../../elements";
import {
  FaGlassWhiskey,
  FaBeer,
  FaWineGlass,
  FaRegTimesCircle,
} from "react-icons/fa";
import { RiPinDistanceFill } from "react-icons/ri";
import { UserLocation } from "../../../screens/HomeScreen";
import { HiX } from "react-icons/hi";

interface BreweriesFilterProps {
  sortFilterBy: string;
  setSortFilterBy: (str: string) => void;
  isSortingEnabled: boolean;
  setIsSortingEnabled: (state: boolean) => void;
  userLocation: UserLocation | null;
}

export function BreweriesFilter({
  sortFilterBy,
  setSortFilterBy,
  isSortingEnabled,
  setIsSortingEnabled,
  userLocation,
}: BreweriesFilterProps) {
  const filterOptions = [
    { label: "Breweries", value: "brewery", icon: FaBeer },
    { label: "Wineries", value: "winery", icon: FaWineGlass },
    // { label: "Distilleries", value: "distillery", icon: FaGlassWhiskey },
  ];

  return (
    <PageWrapper classname="py-4 flex justify-between">
      <div className="flex gap-2">
        {filterOptions.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setSortFilterBy(value)}
            className={`btn btn-sm capitalize ${
              sortFilterBy === value ? "btn-active btn-primary" : ""
            }`}
          >
            <Icon />
            {label}
          </button>
        ))}
        {sortFilterBy !== "all" && (
          <button
            onClick={() => setSortFilterBy("all")}
            className="btn btn-circle btn-sm capitalize"
          >
            <HiX className="text-lg" />
          </button>
        )}
      </div>
      <button
        disabled={!userLocation}
        onClick={() => setIsSortingEnabled(!isSortingEnabled)}
        className={`btn-sm capitalize btn ${
          isSortingEnabled ? "btn-active btn-primary" : ""
        }`}
      >
        <RiPinDistanceFill />
        Sort By Closest
      </button>
    </PageWrapper>
  );
}
