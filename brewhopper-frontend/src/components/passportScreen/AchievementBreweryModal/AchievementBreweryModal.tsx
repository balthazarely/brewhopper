import { HiX } from "react-icons/hi";
import { CloudImage } from "../../elements";

interface AddBeerModalProps {
  achievementToPreview: any;
  achievementPreviewModalOpen: boolean;
  setAchievementPreviewModalOpen: (state: boolean) => void;
}

export function AchievementBreweryModal({
  achievementToPreview,
  achievementPreviewModalOpen,
  setAchievementPreviewModalOpen,
}: AddBeerModalProps) {
  return (
    <div>
      <input
        type="checkbox"
        checked={achievementPreviewModalOpen}
        id="my-modal-6"
        className="modal-toggle relative"
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <button
            className="absolute top-2 right-2 btn btn-sm btn-ghost"
            onClick={() => setAchievementPreviewModalOpen(false)}
          >
            <HiX />
          </button>

          <div className="">
            <div className="mb-2 font-bold text-xl">Breweries</div>
            {achievementToPreview?.achivementBreweries?.map((brewery: any) => {
              return (
                <div
                  key={brewery._id}
                  className="flex border-b-2  items-center gap-4 mb-2"
                >
                  <div className=" w-12 h-12">
                    <CloudImage
                      classes="object-contain"
                      image={brewery?.logoImage}
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="p-2 font-bold text-sm">{brewery.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
