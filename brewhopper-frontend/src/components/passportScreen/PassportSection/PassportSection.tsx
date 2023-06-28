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

  const deletePassportItem = async (id: string) => {
    await deletePassportBrewery(passportForDeletion.id);
    setConfrimActionModalOpen(false);
  };

  return (
    <div>
      {!loadingUserPassportData ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {userPassportData?.breweriesVisited?.map((brewery: any) => {
            return (
              <PassportCard
                brewery={brewery}
                key={brewery.id}
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
