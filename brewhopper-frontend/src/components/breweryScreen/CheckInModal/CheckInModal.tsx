import { HiX } from "react-icons/hi";
import { useState } from "react";
import { useAddPassportBreweryMutation } from "../../../slices/passportSlice";
import { useForm } from "react-hook-form";
import { useReviewBeerMutation } from "../../../slices/beerSlice";
import { HiArrowLeft } from "react-icons/hi2";

const imageUrl = "http://localhost:5001";

export function CheckInModal({
  brewery,
  checkInModalOpen,
  setCheckInModalOpen,
}: any) {
  const [addPassportBrewery, { isLoading: loadingAddPassport }] =
    useAddPassportBreweryMutation({});
  const [addBeerReviews, { isLoading: loadingAddBeerReviews }] =
    useReviewBeerMutation({});

  const [checkInStage, setCheckInStage] = useState("code");
  const [selectedBeer, setSelectedBeer] = useState<any>([]);

  const resetModalForm = () => {
    setCheckInModalOpen(false);
    setTimeout(() => {
      setCheckInStage("code");
      setSelectedBeer([]);
    }, 200);
  };

  async function checkInToBrewery(addBeers: boolean = true) {
    await addPassportBrewery({
      breweryId: brewery?._id,
      beers: addBeers ? selectedBeer : [],
    });
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
        "loading"
      )}
    </>
  );
}

function CheckInWithCodePanel({ setCheckInStage, checkInCode }: any) {
  const [accessCode, setAccessCode] = useState("deschutes-brewing");
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
}: any) {
  const handleSelectBeers = (newBeer: any) => {
    const doesBeerExist = selectedBeer.some(
      (beer: any) => beer._id === newBeer._id
    );
    if (doesBeerExist) {
      const newState = selectedBeer.filter(
        (beers: any) => beers._id !== newBeer._id
      );
      setSelectedBeer(newState);
    } else {
      setSelectedBeer([...selectedBeer, newBeer]);
    }
  };

  return (
    <div className=" flex w-full flex-col items-center justify-between h-80">
      <button
        onClick={() => setCheckInStage("code")}
        className="absolute top-4 left-4 btn btn-xs btn-ghost"
      >
        <HiArrowLeft />
        Back
      </button>
      <div className="text-xl font-bold">Select Beers</div>
      <div
        className=" w-full my-2  overflow-y-scroll"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
          gridGap: "1rem",
        }}
      >
        {beers?.map((beer: any) => {
          const isBeerInArr = selectedBeer.some(
            (currentBeers: any) => currentBeers._id === beer._id
          );
          return (
            <div
              onClick={() => handleSelectBeers(beer)}
              className={` ${
                isBeerInArr ? "border-primary" : "border-transparent"
              } flex cursor-pointer border-2  hover:shadow-lg  bg-white items-center gap-1 flex-col rounded-lg  `}
              key={beer._id}
            >
              <div className="w-20 h-20 overflow-hidden  mt-2 rounded-lg relative">
                <img
                  className="h-full w-full  object-contain rounded-lg"
                  src={`${imageUrl}${beer.image}`}
                  alt="brewery-image"
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
          Next
        </button>
        <button
          disabled={loadingAddPassport}
          onClick={() => checkInToBrewery(false)}
          className={`btn-ghost join-item btn px-2 py-1 w-1/2  `}
        >
          Checkin Without Beer
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
}: any) {
  const { register, handleSubmit, getValues } = useForm();
  const onSubmit = async () => {
    const { reviews } = getValues();
    const reviewsParsed = reviews?.map((review: any) => {
      return {
        review: review.review,
        stars: review.stars,
        breweryId: review.breweryId,
        _id: review._id,
      };
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
          {selectedBeer?.map((beer: any, index: number) => {
            return (
              <div className="w-full flex gap-4 " key={index}>
                <div className="flex w-16 h-32  gap-1  flex-col items-center">
                  <img
                    className="h-full w-full object-contain"
                    src={`${imageUrl}${beer.image}`}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="text-sm font-bold ">{beer.name}</div>
                  <div className="rating mb-2">
                    <input
                      type="radio"
                      className="mask mask-star"
                      value="1"
                      {...register(`reviews[${index}].stars`)}
                    />
                    <input
                      type="radio"
                      className="mask mask-star"
                      value="2"
                      {...register(`reviews[${index}].rating`)}
                    />
                    <input
                      type="radio"
                      className="mask mask-star"
                      value="3"
                      {...register(`reviews[${index}].stars`)}
                    />
                    <input
                      type="radio"
                      className="mask mask-star"
                      value="4"
                      {...register(`reviews[${index}].stars`)}
                    />
                    <input
                      type="radio"
                      className="mask mask-star"
                      value="5"
                      {...register(`reviews[${index}].stars`)}
                      defaultChecked
                    />
                  </div>
                  <textarea
                    placeholder="review"
                    className="textarea  w-full textarea-bordered textarea-primary"
                    {...register(`reviews[${index}].review`, {
                      required: true,
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
                </div>
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

function CongratsPanel({ resetModalForm }: any) {
  return (
    <div className=" w-full h-full  flex flex-col items-center justify-between">
      <div className="text-xl font-bold">Check in Successfull</div>
      <div className="w-full ">
        <button
          onClick={() => resetModalForm("")}
          className={`btn-primary btn px-2 py-1  w-full mt-2 `}
        >
          Close
        </button>
      </div>
    </div>
  );
}
