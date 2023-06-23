export function PassportCard({ brewery }: any) {
  return (
    <div className="flex mb-4">
      <div className="text-xl font-bold">{brewery.breweryName}</div>
      <button className="btn btn-sm">Delete</button>
    </div>
  );
}
