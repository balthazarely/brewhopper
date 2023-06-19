import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
