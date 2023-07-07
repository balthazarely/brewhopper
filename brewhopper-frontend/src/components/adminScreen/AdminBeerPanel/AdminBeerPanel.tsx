import { useDeleteBeerMutation } from "../../../slices/beerSlice";
import { AddBeerModal, ConfirmActionModal, EditBeerModal } from "../modals";
import { useState } from "react";
import { AdminBeerCard } from "..";
import { Beer } from "../../../types";

interface AdminBeerPanelProps {
  breweryId: string;
  beers: Beer[];
  isLoading: boolean;
}

export function AdminBeerPanel({
  breweryId,
  beers,
  isLoading,
}: AdminBeerPanelProps) {
  const [deleteBeer, { isLoading: loadingDelete }] = useDeleteBeerMutation({});
  const [addBeerModalOpen, setAddBeerModalOpen] = useState<boolean>(false);
  const [editBeerModalOpen, setEditBeerModalOpen] = useState<boolean>(false);
  const [beerToEdit, setBeerToEdit] = useState<Beer | null>(null);
  const [beerToDelete, setBeerToDelete] = useState<Beer | null>(null);
  const [confrimActionModalOpen, setConfrimActionModalOpen] =
    useState<boolean>(false);

  const deleteBeerHandler = async () => {
    await deleteBeer({ id: beerToDelete?._id, breweryId: breweryId });
    setConfrimActionModalOpen(false);
  };

  return (
    <div className="p-4 rounded-lg bg-base-200">
      <h2 className="text-xl w-full font-bold">Edit Beers</h2>
      <div className="my-4">
        <button
          onClick={() => setAddBeerModalOpen(true)}
          className="btn btn-sm"
        >
          Add Beer
        </button>
      </div>
      {!isLoading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(144px, 1fr))",
            gridGap: "1rem",
          }}
        >
          {beers?.map((beer: Beer) => {
            return (
              <AdminBeerCard
                beer={beer}
                setBeerToEdit={setBeerToEdit}
                setBeerToDelete={setBeerToDelete}
                setEditBeerModalOpen={setEditBeerModalOpen}
                setConfrimActionModalOpen={setConfrimActionModalOpen}
              />
            );
          })}
        </div>
      ) : (
        "loading"
      )}
      <AddBeerModal
        breweryId={breweryId}
        addBeerModalOpen={addBeerModalOpen}
        setAddBeerModalOpen={setAddBeerModalOpen}
      />
      <EditBeerModal
        breweryId={breweryId}
        beerToEdit={beerToEdit}
        editBeerModalOpen={editBeerModalOpen}
        setEditBeerModalOpen={setEditBeerModalOpen}
      />
      <ConfirmActionModal
        message={`Are you sure you want to delete ${beerToDelete?.name}?`}
        confirmText="Delete"
        loading={loadingDelete}
        confrimActionModalOpen={confrimActionModalOpen}
        setConfrimActionModalOpen={setConfrimActionModalOpen}
        onFireFunction={deleteBeerHandler}
      />
    </div>
  );
}
