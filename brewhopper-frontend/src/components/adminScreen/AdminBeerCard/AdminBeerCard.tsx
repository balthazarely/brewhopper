import { CloudImage } from "../../elements";

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
      <div className="w-32 flex justify-center items-center h-32 overflow-hidden  mt-2 rounded-lg relative">
        <CloudImage image={beer.image} width={120} height={120} />
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
