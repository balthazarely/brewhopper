import { HiX } from "react-icons/hi";
import { useDeleteBreweryMutation } from "../../../../slices/brewerySlice";

export function DeleteBreweryModal({
  breweryToDelete,
  deleteBreweryModalOpen,
  setDeleteBreweryModalOpen,
}: any) {
  const [deleteBrewery, { isLoading: loadingDelete }] =
    useDeleteBreweryMutation({});

  const deleteBreweryHandler = async () => {
    await deleteBrewery(breweryToDelete.id);
    setDeleteBreweryModalOpen(false);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={deleteBreweryModalOpen}
        id="my-modal-6"
        className="modal-toggle relative"
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <button
            className="absolute top-2 right-2 btn btn-sm btn-ghost"
            onClick={() => setDeleteBreweryModalOpen(false)}
          >
            <HiX />
          </button>
          <div className="flex justify-between ">
            <h3 className="font-bold text-lg">Delete Listing</h3>
          </div>
          Are you sure you want to delete {breweryToDelete.name}
          <div className="modal-action">
            <button
              // disabled={!selectedExercise}
              className={`btn-primary btn px-2 py-1 `}
              onClick={deleteBreweryHandler}
            >
              {loadingDelete && (
                <span className="loading loading-spinner"></span>
              )}
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
