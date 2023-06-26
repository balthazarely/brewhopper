import { useParams } from "react-router-dom";
import { useGetBreweryQuery } from "../slices/brewerySlice";
import { PageHeader, PageWrapper } from "../components/elements";
import { HiLocationMarker } from "react-icons/hi";
import { HiPhone } from "react-icons/hi2";
import { BsGlobe } from "react-icons/bs";
import { CheckInModal, SingleBreweryMap } from "../components/breweryScreen";
import { useState } from "react";
import { useGetUserProfileQuery } from "../slices/passportSlice";
import { BeerCard } from "../components/breweryScreen/BeerCard";

export default function BreweryScreen() {
  const { id } = useParams();
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const { data: brewery, isLoading, error } = useGetBreweryQuery(id);
  const imageUrl = "http://localhost:5001";
  const { data: userPassportData } = useGetUserProfileQuery({});

  const isCheckInAllowed = userPassportData?.breweriesVisited?.some(
    (visitedBrewery: any) => visitedBrewery.breweryId === brewery?._id
  );

  return (
    <PageWrapper>
      {!isLoading ? (
        <div>
          <div className="w-full flex mt-4 h-56 bg-gray-300 rounded-lg relative">
            <img
              className="h-full w-full object-cover rounded-md"
              src={`${imageUrl}${brewery.image}`}
              alt="brewery-image"
            />
          </div>
          <div className="flex justify-between items-center">
            <PageHeader title={brewery.name} />
            <button
              onClick={() => setCheckInModalOpen(true)}
              className="btn btn-primary"
              disabled={isCheckInAllowed}
            >
              Check in
            </button>
          </div>

          <div className="capitalize mb-16 ">
            <div className="flex items-center gap-1">
              <HiLocationMarker className=" text-primary" />
              <div>{brewery.address}</div>
            </div>
            <div className="flex items-center gap-1">
              <HiPhone className=" text-primary" />
              <div>{brewery.phone_number}</div>
            </div>
            <div className="flex items-center gap-1">
              <BsGlobe className=" text-primary" />
              <div>{brewery.website}</div>
            </div>
          </div>
          <div
            className="mb-16"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(144px, 1fr))",
              gridGap: "1rem",
            }}
          >
            {brewery?.beers?.map((beer: any) => {
              return <BeerCard beer={beer} />;
            })}
          </div>

          <div className="w-full flex h-96 bg-gray-300 rounded-lg relative">
            <SingleBreweryMap lat={brewery.lat} long={brewery.long} />
          </div>
        </div>
      ) : (
        "loading"
      )}
      <CheckInModal
        brewery={brewery}
        checkInModalOpen={checkInModalOpen}
        setCheckInModalOpen={setCheckInModalOpen}
      />
    </PageWrapper>
  );
}
