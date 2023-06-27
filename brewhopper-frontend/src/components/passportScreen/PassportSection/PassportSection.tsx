import { useState } from "react";
import { PassportCard } from "..";
import { useDeletePassportBreweryMutation } from "../../../slices/passportSlice";
import { ConfirmActionModal } from "../../modals";

export function PassportSection({ userPassportData }: any) {
  const [deletePassportBrewery, { isLoading: loadingDelete }] =
    useDeletePassportBreweryMutation({});
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
      <div className="grid grid-cols-2 md:grid-cols-3">
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
