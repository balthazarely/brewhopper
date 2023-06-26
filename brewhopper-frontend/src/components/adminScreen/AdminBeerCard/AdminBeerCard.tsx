const imageUrl = "http://localhost:5001";

export function AdminBeerCard({
  beer,
  setBeerToEdit,
  setBeerToDelete,
  setEditBeerModalOpen,
  setConfrimActionModalOpen,
}: any) {
  return (
    <div
      className="flex  bg-white items-center gap-1 flex-col  rounded-lg shadow"
      key={beer._id}
    >
      <div className="w-32 h-32 overflow-hidden  mt-2 rounded-lg relative">
        <img
          className="h-full w-full  object-contain rounded-lg"
          src={`${imageUrl}${beer.image}`}
          alt="brewery-image"
        />
      </div>
      <div className="font-bold mx-2 text-center text-sm">{beer.name}</div>
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
          onClick={() => {
            setConfrimActionModalOpen(true);
            setBeerToDelete(beer);
          }}
          className="btn btn-xs"
        >
          delete
        </button>
      </div>
    </div>
  );
}
