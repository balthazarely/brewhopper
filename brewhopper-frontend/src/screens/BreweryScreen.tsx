import { useParams } from "react-router-dom";
import { useGetBreweryQuery } from "../slices/brewerySlice";
import { PageHeader, PageWrapper } from "../components/elements";
import { HiGlobe, HiLocationMarker } from "react-icons/hi";
import { HiPhone } from "react-icons/hi2";
import { BsGlobe } from "react-icons/bs";
import { SingleBreweryMap } from "../components/breweryScreen";

export default function BreweryScreen() {
  const { id } = useParams();
  const { data: brewery, isLoading, error } = useGetBreweryQuery(id);
  console.log(brewery);

  const imageUrl = "http://localhost:5001";

  return (
    <PageWrapper>
      {!isLoading ? (
        <div>
          <div className="flex justify-between items-center">
            <PageHeader title={brewery.breweryInfo.name} />
            <button className="btn btn-primary">Check in</button>
          </div>

          <div className="capitalize mb-16 ">
            <div className="flex items-center gap-1">
              <HiLocationMarker className=" text-primary" />
              <div>{brewery.breweryInfo.address}</div>
            </div>
            <div className="flex items-center gap-1">
              <HiPhone className=" text-primary" />
              <div>{brewery.breweryInfo.phone_number}</div>
            </div>
            <div className="flex items-center gap-1">
              <BsGlobe className=" text-primary" />
              <div>{brewery.breweryInfo.website}</div>
            </div>
          </div>
          <div className="w-full flex h-96 bg-gray-300 rounded-lg relative">
            <img
              className="h-full w-1/2 object-cover rounded-md"
              src={`${imageUrl}${brewery.breweryInfo.image}`}
              alt="brewery-image"
            />
            <div className="h-full w-1/2">
              <SingleBreweryMap
                lat={brewery.breweryInfo.lat}
                long={brewery.breweryInfo.long}
              />
            </div>
          </div>
        </div>
      ) : (
        "loading"
      )}
    </PageWrapper>
  );
}
