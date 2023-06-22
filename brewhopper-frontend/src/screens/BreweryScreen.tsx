import { useParams } from "react-router-dom";
import { useGetBreweryQuery } from "../slices/brewerySlice";

export default function BreweryScreen() {
  const { id } = useParams();
  const { data: brewery, isLoading, error } = useGetBreweryQuery(id);

  return <div>{!isLoading ? JSON.stringify(brewery) : "loading"}</div>;
}
