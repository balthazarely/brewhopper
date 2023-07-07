import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useCreateBreweryMutation,
  useGetBreweriesQuery,
} from "../../../../slices/brewerySlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { HiX } from "react-icons/hi";
import { useAddAchievementMutation } from "../../../../slices/achievementSlice";
import { Brewery } from "../../../../types";
import { useState } from "react";

type Inputs = {
  name: string;
  description: string;
  type: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  lat: number;
  long: number;
  phoneNumber: number;
  website: string;
  checkInCode: string;
};

export function AddAchievementsModal({
  addAchievementsModalOpen,
  setAddAchievementsModalOpen,
}: any) {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [addAchievement] = useAddAchievementMutation();
  const { data: breweries, isLoading: isLoadingBreweries } =
    useGetBreweriesQuery({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newAchievement = { ...data, user: userInfo?._id };
    try {
      await addAchievement(newAchievement);
      setAddAchievementsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  type FormFieldType = {
    name: string;
    type: string;
    fullWidth: boolean;
  };

  const formFeilds: FormFieldType[] = [
    { name: "name", type: "text", fullWidth: true },
    { name: "description", type: "text", fullWidth: true },
  ];

  const [selectedBreweries, setSelectedBreweries] = useState<Brewery[] | []>(
    []
  );

  // const handleSelectBeers = (newBeer: Beer) => {
  //   const doesBeerExist = selectedBeer.some(
  //     (beer: Beer) => beer._id === newBeer._id
  //   );
  //   if (doesBeerExist) {
  //     const newState = selectedBeer.filter(
  //       (beers: Beer) => beers._id !== newBeer._id
  //     );
  //     setSelectedBeer(newState);
  //   } else {
  //     setSelectedBeer([...selectedBeer, newBeer]);
  //   }
  // };

  return (
    <div>
      <input
        type="checkbox"
        checked={addAchievementsModalOpen}
        id="my-modal-6"
        className="modal-toggle relative"
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <button
            className="absolute top-2 right-2 btn btn-sm btn-ghost"
            onClick={() => setAddAchievementsModalOpen(false)}
          >
            <HiX />
          </button>

          <form
            className="flex flex-col mt-8  max-w-lg w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-2xl w-full font-bold">
              Create New Achievement
            </h2>
            <div className="grid grid-cols-2 gap-2 mt-6">
              {formFeilds.map((field: FormFieldType) => {
                return (
                  <div
                    key={field.name}
                    className={` flex flex-col ${
                      field.fullWidth ? "col-span-2" : "col-span-1"
                    }`}
                  >
                    <label htmlFor={field.name} className="capitalize text-sm">
                      {field.name} <span className="text-error">*</span>
                    </label>
                    <input
                      {...(field.type === "number" ? { step: "any" } : {})}
                      type={field.type}
                      className={`input input-bordered input-sm w-full ${
                        errors[field.name as keyof Inputs] ? "input-error" : ""
                      }
                `}
                      {...register(field.name as keyof Inputs, {
                        required: true,
                      })}
                    />
                  </div>
                );
              })}
            </div>
            <div>
              {breweries?.map((brewery: Brewery) => {
                return <div>{brewery?.name}</div>;
              })}
            </div>

            <input className="btn btn-primary mt-4" type="submit" />
            {/* {loadingCreate && "loading"} */}
          </form>
        </div>
      </div>
    </div>
  );
}
