import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import {
  useAddPassportBreweryMutation,
  useGetUserReviewsQuery,
} from "../../../slices/passportSlice";
import { useForm } from "react-hook-form";
import { useReviewBeerMutation } from "../../../slices/beerSlice";
import { HiArrowLeft } from "react-icons/hi2";
import { Beer, Brewery, Review } from "../../../types";
import { CloudImage } from "../../elements";

interface CheckInModalProps {
  brewery: Brewery;
  isBreweryInProximity?: boolean;
  checkInModalOpen: boolean;
  setCheckInModalOpen: (state: boolean) => void;
}

export function CheckInModal({
  brewery,
  checkInModalOpen,
  isBreweryInProximity = false,
  setCheckInModalOpen,
}: CheckInModalProps) {
  const [addPassportBrewery, { isLoading: loadingAddPassport }] =
    useAddPassportBreweryMutation({});
  const [addBeerReviews, { isLoading: loadingAddBeerReviews }] =
    useReviewBeerMutation({});

  const [checkInStage, setCheckInStage] = useState<string>("code");
  const [selectedBeer, setSelectedBeer] = useState<Beer[] | []>([]);

  useEffect(() => {
    if (isBreweryInProximity) {
      setCheckInStage("beer");
    }
  }, []);

  const resetModalForm = () => {
    setCheckInModalOpen(false);
    setTimeout(() => {
      if (isBreweryInProximity) {
        setCheckInStage("beer");
      } else {
        setCheckInStage("code");
      }
      setSelectedBeer([]);
    }, 200);
  };

  async function checkInToBrewery(addBeers: boolean = true) {
    await addPassportBrewery({
      breweryId: brewery?._id,
      beers: addBeers ? selectedBeer : [],
    }).unwrap();
    setCheckInStage("done");
  }

  return (
    <>
      {brewery ? (
        <div>
          <input
            type="checkbox"
            checked={checkInModalOpen}
            id="my-modal-6"
            className="modal-toggle relative"
            readOnly
          />
          <div className="modal">
            <div className="modal-box relative">
              <button
                className="absolute top-2 right-2 btn btn-sm btn-ghost"
                onClick={resetModalForm}
              >
                <HiX />
              </button>
              <div className="modal-action">
                {checkInStage === "code" && (
                  <CheckInWithCodePanel
                    checkInCode={brewery?.check_in_code}
                    setCheckInStage={setCheckInStage}
                  />
                )}
                {checkInStage === "beer" && (
                  <MiniBeerSelector
                    isBreweryInProximity={isBreweryInProximity}
                    selectedBeer={selectedBeer}
                    setSelectedBeer={setSelectedBeer}
                    beers={brewery.beers}
                    setCheckInStage={setCheckInStage}
                    checkInToBrewery={checkInToBrewery}
                    loadingAddPassport={loadingAddPassport}
                  />
                )}
                {checkInStage === "review" && (
                  <BeerReviewPanel
                    selectedBeer={selectedBeer}
                    setCheckInStage={setCheckInStage}
                    checkInToBrewery={checkInToBrewery}
                    addBeerReviews={addBeerReviews}
                    breweryName={brewery.name}
                    loadingAddPassport={loadingAddPassport}
                    loadingAddBeerReviews={loadingAddBeerReviews}
                  />
                )}

                {checkInStage === "done" && (
                  <CongratsPanel resetModalForm={resetModalForm} />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

function CheckInWithCodePanel({
  setCheckInStage,
  checkInCode,
}: {
  setCheckInStage: (stage: string) => void;
  checkInCode: string;
}) {
  const [accessCode, setAccessCode] = useState<string>("deschutes-brewing");
  return (
    <div className=" w-full h-full  flex flex-col items-center justify-between">
      <div className="text-xl font-bold">Enter Check-In Code</div>
      <div className="w-full ">
        <input
          type="text"
          onChange={(e) => setAccessCode(e.target.value)}
          placeholder="Type Access Code"
          className={`input input-bordered mt-2 w-full input-primary`}
        />
        <button
          onClick={() => setCheckInStage("beer")}
          disabled={accessCode !== checkInCode}
          className={`btn-primary btn px-2 py-1  w-full mt-2 `}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

function MiniBeerSelector({
  beers,
  selectedBeer,
  setSelectedBeer,
  setCheckInStage,
  checkInToBrewery,
  loadingAddPassport,
  isBreweryInProximity,
}: {
  beers: Beer[] | undefined;
  selectedBeer: Beer[];
  setSelectedBeer: (beer: Beer[]) => void;
  setCheckInStage: (stage: string) => void;
  checkInToBrewery: (addBeers?: boolean) => void;
  loadingAddPassport: boolean;
  isBreweryInProximity: boolean;
}) {
  const handleSelectBeers = (newBeer: Beer) => {
    const doesBeerExist = selectedBeer.some(
      (beer: Beer) => beer._id === newBeer._id
    );
    if (doesBeerExist) {
      const newState = selectedBeer.filter(
        (beers: Beer) => beers._id !== newBeer._id
      );
      setSelectedBeer(newState);
    } else {
      setSelectedBeer([...selectedBeer, newBeer]);
    }
  };

  return (
    <div className=" flex w-full flex-col items-center justify-between h-96">
      {!isBreweryInProximity && (
        <button
          onClick={() => setCheckInStage("code")}
          className="absolute top-4 left-4 btn btn-xs btn-ghost"
        >
          <HiArrowLeft />
          Back
        </button>
      )}
      <div className="text-xl font-bold">Select Beers</div>
      <div
        className=" w-full  overflow-y-scroll grid grid-cols-2 my-8"
        // style={{
        //   display: "grid",
        //   gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
        //   gridGap: "1rem",
        // }}
      >
        {beers?.map((beer: Beer) => {
          const isBeerInArr = selectedBeer.some(
            (currentBeers: Beer) => currentBeers._id === beer._id
          );
          return (
            <div
              onClick={() => handleSelectBeers(beer)}
              className={` ${
                isBeerInArr ? "border-primary" : "border-transparent"
              } flex cursor-pointer border-2  hover:shadow-lg  bg-white items-center gap-1 flex-col rounded-lg  `}
              key={beer._id}
            >
              <div className="w-20 flex justify-center items-center h-20 overflow-hidden  mt-2 rounded-lg relative">
                <CloudImage
                  classes="object-contain"
                  image={beer.image}
                  width={120}
                  height={120}
                />
              </div>
              <div className="font-bold mx-2 text-center text-xs">
                {beer.name}
              </div>
            </div>
          );
        })}
      </div>
      <div className="join join-horizontal w-full">
        <button
          disabled={!selectedBeer.length}
          onClick={() => setCheckInStage("review")}
          className={`btn-primary join-item btn px-2 py-1 w-1/2   `}
        >
          Review Beers
        </button>
        <button
          disabled={loadingAddPassport}
          onClick={() => checkInToBrewery()}
          className={`btn-ghost join-item btn px-2 py-1 w-1/2  `}
        >
          Checkin Without Reviewing
        </button>
      </div>
    </div>
  );
}

function BeerReviewPanel({
  selectedBeer,
  checkInToBrewery,
  addBeerReviews,
  setCheckInStage,
  loadingAddPassport,
  loadingAddBeerReviews,
  breweryName,
}: {
  selectedBeer: Beer[];
  checkInToBrewery: (addBeers?: boolean) => void;
  addBeerReviews: (review: Review) => void;
  setCheckInStage: (stage: string) => void;
  loadingAddPassport: boolean;
  loadingAddBeerReviews: boolean;
  breweryName: string;
}) {
  const { data: userReviews, isLoading: userReviewsLoaded } =
    useGetUserReviewsQuery({});

  const { register, handleSubmit, getValues } = useForm();

  const onSubmit = async () => {
    const { reviews } = getValues();
    const reviewsParsed = reviews
      ?.map((review: any) => {
        return {
          review: review.review,
          stars: Number(review.stars),
          breweryId: review.breweryId,
          breweryName: breweryName,
          beerName: review.name,
          style: review.style,
          _id: review._id,
        };
      })
      .filter((newReview: Review) => {
        return !userReviews.some(
          (userReview: Review) => userReview?.beerId?._id === newReview._id
        );
      });

    await checkInToBrewery();
    await addBeerReviews(reviewsParsed);
    setCheckInStage("done");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-between h-96 "
      >
        <button
          onClick={() => setCheckInStage("beer")}
          className="absolute top-4 left-4 btn btn-xs btn-ghost"
        >
          <HiArrowLeft />
          Back
        </button>
        <div className="text-xl font-bold">Review Beers</div>
        <div className="flex gap-8 flex-col w-full py-4 h-72 px-2 overflow-y-auto">
          {selectedBeer?.map((beer: Beer, index: number) => {
            let doesExist = userReviews?.some(
              (review: any) => review?.beerId?._id == beer._id
            );

            return (
              <div className="w-full flex gap-4 " key={index}>
                <div className="w-24 flex justify-center items-center h-24 overflow-hidden  mt-2 rounded-lg relative">
                  <CloudImage
                    classes="object-contain"
                    image={beer.image}
                    width={120}
                    height={120}
                  />
                </div>
                {!userReviewsLoaded ? (
                  <div className="flex flex-col w-full">
                    <div className="text-sm font-bold ">{beer.name}</div>
                    {!doesExist ? (
                      <div>
                        <div className="rating mb-2">
                          <input
                            disabled={doesExist}
                            type="radio"
                            className="mask mask-star"
                            value="1"
                            {...register(`reviews[${index}].stars`)}
                          />
                          <input
                            disabled={doesExist}
                            type="radio"
                            className="mask mask-star"
                            value="2"
                            {...register(`reviews[${index}].stars`)}
                          />
                          <input
                            disabled={doesExist}
                            type="radio"
                            className="mask mask-star"
                            value="3"
                            {...register(`reviews[${index}].stars`)}
                          />
                          <input
                            disabled={doesExist}
                            type="radio"
                            className="mask mask-star"
                            value="4"
                            {...register(`reviews[${index}].stars`)}
                          />
                          <input
                            disabled={doesExist}
                            type="radio"
                            className="mask mask-star"
                            value="5"
                            {...register(`reviews[${index}].stars`)}
                            defaultChecked
                          />
                        </div>

                        <textarea
                          disabled={doesExist}
                          placeholder="review"
                          className="textarea  w-full textarea-bordered textarea-primary"
                          {...register(`reviews[${index}].review`, {
                            required: !doesExist,
                          })}
                        />
                        <input
                          type="hidden"
                          {...register(`reviews[${index}]._id`)}
                          value={beer._id}
                        />
                        <input
                          type="hidden"
                          {...register(`reviews[${index}].breweryId`)}
                          value={beer.breweryId}
                        />
                        <input
                          type="hidden"
                          {...register(`reviews[${index}].name`)}
                          value={beer.name}
                        />
                        <input
                          type="hidden"
                          {...register(`reviews[${index}].style`)}
                          value={beer.style}
                        />
                      </div>
                    ) : (
                      <div className="bg-base-200 flex-col text-sm h-full rounded-lg flex justify-center items-center">
                        <div>You've already reviewed this one</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="loading loading-lg"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button
          className={`btn-primary btn px-2 py-1 mb-2  w-full mt-2  `}
          type="submit"
          disabled={loadingAddPassport || loadingAddBeerReviews}
        >
          Submit
        </button>
      </form>
    </>
  );
}

function CongratsPanel({ resetModalForm }: { resetModalForm: () => void }) {
  return (
    <div className=" w-full h-full  flex flex-col items-center justify-between">
      <div className="text-xl font-bold">Check in Successfull</div>
      <div className="w-full ">
        <button
          onClick={() => resetModalForm()}
          className={`btn-primary btn px-2 py-1  w-full mt-2 `}
        >
          Close
        </button>
      </div>
    </div>
  );
}
