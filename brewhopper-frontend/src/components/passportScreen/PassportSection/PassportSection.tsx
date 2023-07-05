import { useState } from "react";
import { PassportCard } from "..";
import {
  useDeletePassportBreweryMutation,
  useGetUserProfileQuery,
} from "../../../slices/passportSlice";
import { ConfirmActionModal } from "../../modals";

export function PassportSection() {
  const [deletePassportBrewery, { isLoading: loadingDelete }] =
    useDeletePassportBreweryMutation({});
  const { data: userPassportData, isLoading: loadingUserPassportData } =
    useGetUserProfileQuery({});

  const [confrimActionModalOpen, setConfrimActionModalOpen] = useState(false);
  const [passportForDeletion, setPassportForDeletion] = useState({
    id: "",
    name: "",
  });

  const deletePassportItem = async () => {
    await deletePassportBrewery(passportForDeletion.id);
    setConfrimActionModalOpen(false);
  };

  if (userPassportData?.breweriesVisited?.length === 0) {
    return (
      <div className="w-full flex-col text-xl flex justify-center items-center h-44 ">
        <div> No brewery visits yet!</div>
        <div className="text-sm mt-2">
          To get started, head to a brewery and click "Check In"
        </div>
      </div>
    );
  }

  return (
    <div>
      {!loadingUserPassportData ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {userPassportData?.breweriesVisited?.map((brewery: any) => {
            return (
              <PassportCard
                key={brewery.id}
                brewery={brewery}
                deletePassportItem={deletePassportItem}
                setPassportForDeletion={setPassportForDeletion}
                setConfrimActionModalOpen={setConfrimActionModalOpen}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full h-72  flex justify-center items-center">
          <div className="loading loading-spinner  loading-lg"></div>
        </div>
      )}

      <ConfirmActionModal
        message={`Are you sure you want to delete review for ${passportForDeletion.name}?`}
        confirmText="Delete"
        loading={loadingDelete}
        confrimActionModalOpen={confrimActionModalOpen}
        setConfrimActionModalOpen={setConfrimActionModalOpen}
        onFireFunction={deletePassportItem}
      />
    </div>
  );
}
