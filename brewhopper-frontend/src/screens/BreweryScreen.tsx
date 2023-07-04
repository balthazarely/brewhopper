import { useParams } from "react-router-dom";
import { useGetBreweryQuery } from "../slices/brewerySlice";
import { CloudImage, PageHeader, PageWrapper } from "../components/elements";
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
  const { data: brewery, isLoading: breweryDataLoading } =
    useGetBreweryQuery(id);
  const imageUrl = "http://localhost:5001";
  const { data: userPassportData } = useGetUserProfileQuery({});

  const isCheckInAllowed = userPassportData?.breweriesVisited?.some(
    (visitedBrewery: any) => visitedBrewery.breweryId === brewery?._id
  );

  return (
    <>
      {!breweryDataLoading ? (
        <div>
          <div className="w-full  justify-center items-center flex  h-56 bg-gray-300 rounded-lg relative">
            {/* <img
              className="h-full w-full object-cover rounded-md"
              src={`${imageUrl}${brewery.image}`}
              alt="brewery-image"
            /> */}
            {/* <CloudImage image={brewery?.image} width={500} height={500} /> */}
          </div>

          <PageWrapper classname="max-w-5xl">
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
                <div className="lowercase">{brewery.website}</div>
              </div>
            </div>
            <div className="text-xl font-bold">Our Beers</div>
            <div
              className="mb-16 mt-4"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(144px, 160px)",
                gridGap: "1rem",
              }}
            >
              {brewery?.beers?.map((beer: any) => {
                return <BeerCard beer={beer} />;
              })}
            </div>
          </PageWrapper>

          <div className="w-full flex h-96 bg-gray-300 rounded-lg relative">
            <SingleBreweryMap lat={brewery.lat} long={brewery.long} />
          </div>
        </div>
      ) : (
        <div className="w-full h-72  flex justify-center items-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      )}

      <CheckInModal
        brewery={brewery}
        checkInModalOpen={checkInModalOpen}
        setCheckInModalOpen={setCheckInModalOpen}
      />
    </>
  );
}
