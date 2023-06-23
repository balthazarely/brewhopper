import { HiX } from "react-icons/hi";
import { ChangeEvent, useCallback, useState } from "react";
import { useAddPassportBreweryMutation } from "../../../slices/passportSlice";

export function CheckInModal({
  brewery,
  checkInModalOpen,
  setCheckInModalOpen,
}: any) {
  const [addPassportBrewery, { isLoading: loadingAdd }] =
    useAddPassportBreweryMutation({});
  const [accessCode, setAccessCode] = useState("");

  const handleAccessCodeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setAccessCode(e.target.value);
    },
    []
  );

  const handleSubmitCode = async () => {
    if (accessCode !== brewery?.breweryInfo?.check_in_code) {
    } else {
      await addPassportBrewery({
        breweryId: brewery?.breweryInfo._id,
        breweryName: brewery?.breweryInfo.name,
        breweryImage: brewery?.breweryInfo.image,
      });
      setCheckInModalOpen(false);
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
                  Check in to {brewery?.breweryInfo?.name}
                </h3>
              </div>

              <div className="modal-action flex w-full flex-col items-center">
                Enter access code below
                <input
                  type="text"
                  onChange={handleAccessCodeChange}
                  placeholder="Type Access Code"
                  className={`input input-bordered mt-2 w-full input-primary`}
                />
                <button
                  disabled={accessCode !== brewery?.breweryInfo?.check_in_code}
                  className={`btn-primary btn px-2 py-1  w-full mt-2 `}
                  onClick={handleSubmitCode}
                >
                  {loadingAdd && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Check In
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
