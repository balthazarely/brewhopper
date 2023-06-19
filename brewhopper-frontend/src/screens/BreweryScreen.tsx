import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BreweryScreen() {
  const { id } = useParams();
  const [breweryData, setBreweryData] = useState();

  useEffect(() => {
    const getBreweryData = async () => {
      const data = await fetch(`/api/breweries/${id}`);
      const json = await data.json();
      console.log(json);
      setBreweryData(json);
    };
    getBreweryData();
  }, []);

  return <div>{breweryData ? JSON.stringify(breweryData) : "nothing"}</div>;
}
