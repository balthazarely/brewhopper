import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BreweryMap from "../components/BreweryMap";
import BreweryMapTwo from "../components/BreweryMapTwo";
import Brew from "../components/Brew";

export default function HomeScreen() {
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    const getBreweryData = async () => {
      const data = await fetch("/api/breweries");
      const json = await data.json();
      console.log(json);
      setBreweries(json);
    };
    getBreweryData();
  }, []);

  return (
    <>
      {breweries && breweries.length ? (
        <div>
          <h2>Brewries</h2>
          {/* <BreweryMapTwo breweries={breweries} /> */}
          <Brew breweries={breweries} />
          {/* <BreweryMap breweries={breweries} /> */}
          <div>
            {breweries.map((brewery: any) => {
              return (
                <div key={brewery._id}>
                  {/* {brewery.name} */}
                  <Link to={`/brewery/${brewery._id}`}>{brewery.name}</Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>no brew</div>
      )}
    </>
  );
}
