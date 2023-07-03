import { useDeleteBeerMutation } from "../../../slices/beerSlice";
import {
  AddBeerModal,
  ConfirmActionModal,
  EditBeerModal,
} from "../../../components/adminScreen/modals";
import { useState } from "react";
import { AdminBeerCard } from "../../../components/adminScreen";

export function AdminBeerPanel({ breweryId, beers, isLoading }: any) {
  const [deleteBeer, { isLoading: loadingDelete }] = useDeleteBeerMutation({});
  const [addBeerModalOpen, setAddBeerModalOpen] = useState(false);
  const [editBeerModalOpen, setEditBeerModalOpen] = useState(false);
  const [beerToEdit, setBeerToEdit] = useState(null);
  const [beerToDelete, setBeerToDelete] = useState<any>(null);
  const [confrimActionModalOpen, setConfrimActionModalOpen] = useState(false);

  const deleteBeerHandler = async () => {
    await deleteBeer({ id: beerToDelete._id, breweryId: breweryId });
    setConfrimActionModalOpen(false);
  };

  // console.log(beers, "beers");

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
          {beers?.map((beer: any) => {
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
