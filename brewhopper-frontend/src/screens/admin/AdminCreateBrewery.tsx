import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateBreweryMutation } from "../../slices/brewerySlice";
import { PageWrapper } from "../../components/elements";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type Inputs = {
  name: string;
  description: string;
  type: string;
  address: string;
  lat: number;
  long: number;
  phoneNumber: number;
  website: string;
  checkInCode: string;
};

export default function AdminCreateBrewery() {
  const navigate = useNavigate();
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
      navigate("/admin");
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
    { name: "website", type: "text", fullWidth: true },
    { name: "phoneNumber", type: "number", fullWidth: false },
    { name: "checkInCode", type: "text", fullWidth: false },
    { name: "lat", type: "number", fullWidth: false },
    { name: "long", type: "number", fullWidth: false },
  ];

  return (
    <PageWrapper classname="flex flex-col items-center ">
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
                  {...register(field.name as keyof Inputs, { required: true })}
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
    </PageWrapper>
  );
}
