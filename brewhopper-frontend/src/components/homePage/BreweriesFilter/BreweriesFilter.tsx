import { PageWrapper } from "../../elements";
import {
  FaGlassWhiskey,
  FaBeer,
  FaWineGlass,
  FaRegTimesCircle,
} from "react-icons/fa";

interface BreweriesFilterProps {
  sortFilterBy: string;
  setSortFilterBy: (str: string) => void;
}

export function BreweriesFilter({
  sortFilterBy,
  setSortFilterBy,
}: BreweriesFilterProps) {
  return (
    <PageWrapper classname="py-4">
      <div className="flex gap-2">
        <button
          onClick={() => setSortFilterBy("brewery")}
          className={`${
            sortFilterBy === "brewery" ? "btn-active" : ""
          } btn btn-sm capitalize`}
        >
          <FaBeer />
          Breweries
        </button>
        <button
          onClick={() => setSortFilterBy("winery")}
          className={`${
            sortFilterBy === "winery" ? "btn-active" : ""
          } btn btn-sm capitalize`}
        >
          <FaWineGlass />
          Wineries
        </button>
        <button
          onClick={() => setSortFilterBy("distilery")}
          className={`${
            sortFilterBy === "distilery" ? "btn-active" : ""
          } btn btn-sm capitalize`}
        >
          <FaGlassWhiskey />
          Distileries
        </button>
        <button
          onClick={() => setSortFilterBy("all")}
          className="btn btn-circle btn-sm capitalize"
        >
          <FaRegTimesCircle className="text-lg" />
        </button>
      </div>
    </PageWrapper>
  );
}
