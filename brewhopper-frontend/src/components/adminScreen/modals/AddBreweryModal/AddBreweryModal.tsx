import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateBreweryMutation } from "../../../../slices/brewerySlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { HiX } from "react-icons/hi";

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

export function AddBreweryModal({
  addBreweryModalOpen,
  setAddBreweryModalOpen,
}: any) {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [createBrewery] = useCreateBreweryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newBrewery = { ...data, user: userInfo?._id };
    try {
      await createBrewery(newBrewery);
      setAddBreweryModalOpen(false);
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
    { name: "address", type: "text", fullWidth: true },
    { name: "city", type: "text", fullWidth: true },
    { name: "state", type: "text", fullWidth: false },
    { name: "zip", type: "number", fullWidth: false },
    { name: "website", type: "text", fullWidth: true },
    { name: "phoneNumber", type: "number", fullWidth: false },
    { name: "checkInCode", type: "text", fullWidth: false },
    { name: "lat", type: "number", fullWidth: false },
    { name: "long", type: "number", fullWidth: false },
  ];

  return (
    <div>
      <input
        type="checkbox"
        checked={addBreweryModalOpen}
        id="my-modal-6"
        className="modal-toggle relative"
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <button
            className="absolute top-2 right-2 btn btn-sm btn-ghost"
            onClick={() => setAddBreweryModalOpen(false)}
          >
            <HiX />
          </button>

          <form
            className="flex flex-col mt-8  max-w-lg w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-2xl w-full font-bold">Create new listing</h2>
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
            <select
              className={`input input-bordered w-full input-sm mt-4 ${
                errors.type ? "input-error" : ""
              }`}
              {...register("type", { required: true })}
            >
              <option value="">Select Type</option>
              <option value="brewery">Brewery</option>
              <option value="winery">Winery</option>
              <option value="distillery">Distillery</option>
              <option value="cidery">Cidery</option>
            </select>

            <input className="btn btn-primary mt-4" type="submit" />
            {/* {loadingCreate && "loading"} */}
          </form>
        </div>
      </div>
    </div>
  );
}
