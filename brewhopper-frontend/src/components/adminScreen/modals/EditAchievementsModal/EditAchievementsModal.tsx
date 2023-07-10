import { useForm, SubmitHandler } from "react-hook-form";
import { useGetBreweriesQuery } from "../../../../slices/brewerySlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { HiX } from "react-icons/hi";
import { useUpdateAchievementMutation } from "../../../../slices/achievementSlice";
import { Brewery } from "../../../../types";
import { useEffect, useState } from "react";

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

export function EditAchievementsModal({
  achievementToEdit,
  editAchievementModalOpen,
  setEditAchievementModalOpen,
}: any) {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [updateAchievement] = useUpdateAchievementMutation({});
  const [selectedBreweries, setSelectedBreweries] = useState<Brewery[] | []>(
    []
  );
  const { data: breweries } = useGetBreweriesQuery({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (achievementToEdit) {
      reset({
        name: achievementToEdit.name,
        description: achievementToEdit.description,
      });
      setSelectedBreweries(achievementToEdit.achivementBreweries);
    }
  }, [achievementToEdit, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const breweryIds = selectedBreweries.map((brewery: Brewery) => brewery._id);
    const newAchievement = {
      ...data,
      achivementBreweries: breweryIds,
      user: userInfo?._id,
      id: achievementToEdit?._id,
    };

    try {
      await updateAchievement(newAchievement);
      setEditAchievementModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // type FormFieldType = {
  //   name: string;
  //   type: string;
  //   fullWidth: boolean;
  // };

  // const formFeilds: FormFieldType[] = [
  //   { name: "name", type: "text", fullWidth: true },
  //   { name: "description", type: "text", fullWidth: true },
  // ];

  const handleSelectBrewery = (brewery: Brewery) => {
    const doesBeerExist = selectedBreweries.some(
      (beer) => beer._id === brewery._id
    );
    if (doesBeerExist) {
      const newState = selectedBreweries.filter(
        (beer) => beer._id !== brewery._id
      );
      setSelectedBreweries(newState);
    } else {
      setSelectedBreweries([...selectedBreweries, brewery]);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={editAchievementModalOpen}
        id="my-modal-6"
        className="modal-toggle relative"
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <button
            className="absolute top-2 right-2 btn btn-sm btn-ghost"
            onClick={() => setEditAchievementModalOpen(false)}
          >
            <HiX />
          </button>

          <form
            className="flex flex-col mt-8  max-w-lg w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-2xl w-full font-bold">Edit Achievement</h2>
            <div className="grid grid-cols-2 gap-2 mt-6">
              {achievementToEdit ? (
                <>
                  <div className={` flex flex-col col-span-2`}>
                    <label htmlFor="name" className="capitalize text-sm">
                      name <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={achievementToEdit.name}
                      className={`input input-bordered input-sm w-full ${
                        errors.name ? "input-error" : ""
                      }
                `}
                      {...register("name", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className={` flex flex-col col-span-2`}>
                    <label htmlFor="description" className="capitalize text-sm">
                      description <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={achievementToEdit.description}
                      className={`input input-bordered input-sm w-full ${
                        errors.description ? "input-error" : ""
                      }
                `}
                      {...register("description", {
                        required: true,
                      })}
                    />
                  </div>
                </>
              ) : (
                <>login</>
              )}
            </div>

            <div className="flex flex-wrap mt-2">
              {breweries?.map((brewery: any) => (
                <div
                  onClick={() => handleSelectBrewery(brewery)}
                  className={`${
                    !selectedBreweries.some(
                      (selected) => selected._id === brewery._id
                    )
                      ? "border-transparent"
                      : "border-primary"
                  }  shadow m-1 bg-base-200 cursor-pointer border-2 rounded-lg text-sm p-2`}
                  key={brewery._id}
                >
                  {brewery.name}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label htmlFor="selected" className="capitalize text-sm">
                Selected Breweries
              </label>
              <div className=" border-2 p-1 h-44 overflow-y-scroll">
                {selectedBreweries?.map((brewery) => (
                  <div
                    className="badge badge-primary gap-2 m-1"
                    key={brewery._id}
                  >
                    <button onClick={() => handleSelectBrewery(brewery)}>
                      <HiX />
                    </button>
                    {brewery.name}
                  </div>
                ))}
              </div>
            </div>

            <input className="btn btn-primary mt-4" type="submit" />
            {/* {loadingCreate && "loading"} */}
          </form>
        </div>
      </div>
    </div>
  );
}
