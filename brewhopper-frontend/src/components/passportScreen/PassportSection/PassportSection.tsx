import { useState } from "react";
import { PassportCard } from "..";
import { useDeletePassportBreweryMutation } from "../../../slices/passportSlice";
import { ConfirmActionModal } from "../../modals";
import { FullPageLoader } from "../../elements";

export function PassportSection({
  userPassportData,
  loadingUserPassportData,
}: any) {
  const [deletePassportBrewery, { isLoading: loadingDelete }] =
    useDeletePassportBreweryMutation({});

  const [confrimActionModalOpen, setConfrimActionModalOpen] = useState(false);
  const [passportForDeletion, setPassportForDeletion] = useState({
    id: "",
    name: "",
  });

  const deletePassportItem = async () => {
    await deletePassportBrewery(passportForDeletion.id);
    setConfrimActionModalOpen(false);
  };

  if (loadingUserPassportData) {
    return <FullPageLoader classes="h-56" />;
  }

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
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {userPassportData?.breweriesVisited?.map((brewery: any) => {
          return (
            <PassportCard
              key={brewery._id}
              brewery={brewery}
              deletePassportItem={deletePassportItem}
              setPassportForDeletion={setPassportForDeletion}
              setConfrimActionModalOpen={setConfrimActionModalOpen}
            />
          );
        })}
      </div>
      <ConfirmActionModal
        message={`Are you sure you want to delete review for ${passportForDeletion.name}?`}
        confirmText="Delete"
        loading={loadingDelete}
        confrimActionModalOpen={confrimActionModalOpen}
        setConfrimActionModalOpen={setConfrimActionModalOpen}
        onFireFunction={deletePassportItem}
      />
    </>
  );
}
