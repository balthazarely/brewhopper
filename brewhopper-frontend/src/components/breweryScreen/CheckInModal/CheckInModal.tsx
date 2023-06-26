import { HiX } from "react-icons/hi";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useAddPassportBreweryMutation } from "../../../slices/passportSlice";
const imageUrl = "http://localhost:5001";

export function CheckInModal({
  brewery,
  checkInModalOpen,
  setCheckInModalOpen,
}: any) {
  const [addPassportBrewery, { isLoading: loadingAdd }] =
    useAddPassportBreweryMutation({});
  const [accessCode, setAccessCode] = useState("deschutes-brewing");

  const [showBeerReviewPanel, setShowBeerReviewPanel] =
    useState<boolean>(false);

  const handleAccessCodeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setAccessCode(e.target.value);
    },
    []
  );

  const [selectedBeer, setSelectedBeer] = useState<any>([]);
  const handleSubmitCode = async () => {
    if (accessCode !== brewery?.check_in_code) {
      return;
    } else {
      setShowBeerReviewPanel(true);
      console.log(selectedBeer);

      // TODO: add a whole beer to the local state, not just the id
      // before sending request, reparse and add comment, review, rating
      // this also needs to go to the beer object that will be on the beer item in the DB

      // await addPassportBrewery({
      //   breweryId: brewery?._id,
      //   beers: selectedBeer,
      // });
      // setCheckInModalOpen(false);
    }
  };

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
                onClick={() => setCheckInModalOpen(false)}
              >
                <HiX />
              </button>
              <div className="flex justify-center ">
                <h3 className="font-bold text-lg">
                  Check in to {brewery?.name}
                </h3>
              </div>

              <div className="modal-action flex w-full flex-col items-center ">
                Enter access code below
                <input
                  type="text"
                  onChange={handleAccessCodeChange}
                  placeholder="Type Access Code"
                  className={`input input-bordered mt-2 w-full input-primary`}
                />
                {!showBeerReviewPanel ? (
                  <MiniBeerSelector
                    selectedBeer={selectedBeer}
                    setSelectedBeer={setSelectedBeer}
                    beers={brewery.beers}
                  />
                ) : (
                  <BeerReviewPanel selectedBeer={selectedBeer} />
                )}
                <button
                  disabled={accessCode !== brewery?.check_in_code}
                  className={`btn-primary btn px-2 py-1  w-full mt-2 `}
                  onClick={handleSubmitCode}
                >
                  {loadingAdd && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Continue
                </button>
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

function BeerReviewPanel({ selectedBeer }: any) {
  console.log(selectedBeer);

  return (
    <div className=" w-full my-4 h-56">
      {selectedBeer?.map((beer: any) => {
        return <div>{beer.name}</div>;
      })}
    </div>
  );
}

function MiniBeerSelector({ beers }: any) {
  const [selectedBeer, setSelectedBeer] = useState<any>([]);

  const handleSelectBeers = (beer: any) => {
    setSelectedBeer(beer);
    // if (selectedBeer.includes(id)) {
    //   const newState = selectedBeer.filter((state: any) => state !== id);
    //   setSelectedBeer(newState);
    // } else {
    //   setSelectedBeer([...selectedBeer, id]);
    // }
  };

  // ${
  //   selectedBeer?.includes(beer._id)
  //     ? "border-primary"
  //     : "border-transparent"
  // }

  useEffect(() => {
    console.log(selectedBeer);
  }, [selectedBeer]);

  return (
    <div className=" w-full my-4 h-56">
      <div className="mb-2 font-bold text-center w-full">Beers Tasted</div>
      <div
        className=" w-full "
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(64px, 1fr))",
          gridGap: "1rem",
        }}
      >
        {beers?.map((beer: any) => {
          return (
            <div
              onClick={() => handleSelectBeers(beer)}
              className={`flex cursor-pointer border-2  hover:shadow-lg  bg-white items-center gap-1 flex-col rounded-lg shadow `}
              key={beer._id}
            >
              <div className="w-16 h-16 overflow-hidden  mt-2 rounded-lg relative">
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
    </div>
  );
}
