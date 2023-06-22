import { useDeleteBreweryMutation } from "../../../../slices/brewerySlice";

export function DeleteBreweryModal({
  breweryToDelete,
  deleteBreweryModalOpen,
  setDeleteBreweryModalOpen,
}: any) {
  const [deleteBrewery, { isLoading: loadingDelete }] =
    useDeleteBreweryMutation({});

  const deleteBreweryHandler = async () => {
    await deleteBrewery(breweryToDelete);
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
            Close
          </button>
          <div className="flex justify-between ">
            <h3 className="font-bold text-lg">Delete Location</h3>
          </div>
          {breweryToDelete && JSON.stringify(breweryToDelete)}

          <div className="modal-action">
            <button
              // disabled={!selectedExercise}
              className={`btn-primary btn px-2 py-1 `}
              onClick={deleteBreweryHandler}
            >
              Delete
            </button>
            {loadingDelete && "loading"}
          </div>
        </div>
      </div>
    </div>
  );
}
