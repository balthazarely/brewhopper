import { Link } from "react-router-dom";

interface BreweryMapCardProps {
  brewery: any;
}

export function BreweryMapCard({ brewery }: BreweryMapCardProps) {
  return (
    <div className="flex justify-between h-12 p-2">
      <div className="text-xl font-bold">{brewery.name}</div>
      <Link to={`/brewery/${brewery._id}`}>see more</Link>
    </div>
  );
}
