import { useParams } from "react-router-dom";
import { PageHeader, PageWrapper } from "../../components/elements";
import {
  useDeleteBeerMutation,
  useGetBeersAtBreweryQuery,
} from "../../slices/beerSlice";
import {
  AddBeerModal,
  EditBeerModal,
} from "../../components/adminScreen/modals";
import { useState } from "react";

const imageUrl = "http://localhost:5001";

export default function AdminEditBeers() {
  const { id: breweryId } = useParams();
  const {
    data: beers,
    isLoading,
    error,
  } = useGetBeersAtBreweryQuery(breweryId);
  const [deleteBeer, { isLoading: loadingDelete }] = useDeleteBeerMutation({});
  const [addBeerModalOpen, setAddBeerModalOpen] = useState(false);
  const [editBeerModalOpen, setEditBeerModalOpen] = useState(false);
  const [beerToEdit, setBeerToEdit] = useState(null);

  const deleteBeerHandler = async (id: string) => {
    await deleteBeer(id);
  };

  console.log("beer to edit", beerToEdit);

  return (
    <PageWrapper>
      <PageHeader title="Beer Dashboard" />
      <div className="my-4">
        <button
          onClick={() => setAddBeerModalOpen(true)}
          className="btn btn-sm"
        >
          Add Beer
        </button>
      </div>
      {!isLoading ? (
        <div className="">
          <div className="flex flex-wrap gap-6">
            {beers.map((beer: any) => {
              return (
                <div
                  className="flex items-center gap-1 flex-col border-2"
                  key={beer._id}
                >
                  <div className="w-32 h-32  bg-gray-300 rounded-lg relative">
                    <img
                      className="h-full w-full object-cover rounded-lg "
                      src={`${imageUrl}${beer.image}`}
                      alt="brewery-image"
                    />
                  </div>
                  <div className="font-bold text-sm">{beer.name}</div>
                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={() => {
                        setEditBeerModalOpen(true);
                        setBeerToEdit(beer);
                      }}
                      className="btn btn-xs"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => deleteBeerHandler(beer._id)}
                      className="btn btn-xs"
                    >
                      delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
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
    </PageWrapper>
  );
}
