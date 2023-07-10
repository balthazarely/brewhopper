import { useParams } from "react-router-dom";
import { useGetBreweryQuery } from "../slices/brewerySlice";
import {
  CloudImage,
  FullPageLoader,
  PageWrapper,
} from "../components/elements";
import { HiLocationMarker } from "react-icons/hi";
import { HiPhone } from "react-icons/hi2";
import { BsGlobe } from "react-icons/bs";
import { CheckInModal, SingleBreweryMap } from "../components/breweryScreen";
import { useState } from "react";
import { BeerCard } from "../components/breweryScreen/BeerCard";
import { HeroBanner } from "../components/elements/HeroBanner";
import { Beer } from "../types";
import { formatPhoneNumber } from "../utils/numbers";

export default function BreweryScreen() {
  const { id } = useParams();
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const { data: brewery, isLoading: breweryDataLoading } =
    useGetBreweryQuery(id);

  if (breweryDataLoading) {
    return <FullPageLoader />;
  }

  return (
    <>
      <div className="w-full">
        <HeroBanner classes="object-cover" image={brewery?.image} />
        <PageWrapper classname="max-w-4xl w-full transform -translate-y-24">
          <div className="border-2 ml-8 border-base-200 shadow-lg overflow-hidden p-2 w-36 bg-white h-36">
            <CloudImage
              classes="object-contain"
              image={brewery?.logoImage}
              width={400}
              height={400}
            />
          </div>
        </PageWrapper>

        <PageWrapper classname="max-w-4xl w-full -mt-16 px-4">
          <div className="flex items-center justify-between  mb-4 gap-8 ">
            <div className="text-2xl font-bold">{brewery.name}</div>
            <div>
              <button
                onClick={() => setCheckInModalOpen(true)}
                className="btn btn-primary "
              >
                Check in
              </button>
            </div>
          </div>

          <div className="capitalize mb-16 flex gap-8 ">
            <div className="flex gap-1">
              <HiLocationMarker className="mt-2 text-primary text-xl" />
              <div>
                <div>{brewery.address}</div>
                <div>
                  {brewery.city}, {brewery.state} {brewery.zip}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <HiPhone className=" text-primary" />
                <div>{formatPhoneNumber(brewery.phone_number)}</div>
              </div>
              <div className="flex items-center gap-1">
                <BsGlobe className=" text-primary" />
                <div className="lowercase">{brewery.website}</div>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="text-xl font-bold">Our Beers</div>
          <div className="mb-16 mt-4 flex overflow-y-scroll pb-5">
            {brewery?.beers?.map((beer: Beer) => {
              return <BeerCard beer={beer} />;
            })}
          </div>
        </PageWrapper>

        <div className="w-full flex h-96 bg-gray-300 rounded-lg relative">
          <SingleBreweryMap lat={brewery.lat} long={brewery.long} />
        </div>
      </div>

      <CheckInModal
        brewery={brewery}
        checkInModalOpen={checkInModalOpen}
        setCheckInModalOpen={setCheckInModalOpen}
      />
    </>
  );
}
