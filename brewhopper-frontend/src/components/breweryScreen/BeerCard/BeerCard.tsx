const imageUrl = "http://localhost:5001";

export function BeerCard({ beer }: any) {
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
    </div>
  );
}
