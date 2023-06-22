import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBreweryQuery,
  useUpdatedBreweryMutation,
} from "../../slices/brewerySlice";
import { PageWrapper } from "../../components/elements";
import { useForm, SubmitHandler } from "react-hook-form";

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

export default function AdminEditBreweryScreen() {
  const { id } = useParams();
  const { data: brewery, isLoading } = useGetBreweryQuery(id);
  console.log(brewery);

  const navigate = useNavigate();
  const [updateBrewery] = useUpdatedBreweryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const udpatedBrewery = {
      ...data,
      breweryId: id,
      user: brewery.breweryInfo?.user,
    };
    console.log(udpatedBrewery);

    await updateBrewery(udpatedBrewery);
    navigate("/admin");
  };

  return (
    <PageWrapper classname="flex flex-col items-center ">
      {!isLoading ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          // onSubmit={(e) => handleSaveChanges(e)}
          className="flex flex-col mt-8  max-w-lg w-full"
        >
          <h2 className="text-2xl w-full font-bold">Edit listing</h2>
          <div className="grid grid-cols-2 gap-2 mt-6">
            <div className={`flex flex-col col-span-2`}>
              <label htmlFor="name" className="capitalize text-sm">
                name <span className="text-error">*</span>
              </label>
              <input
                id="name"
                type="text"
                defaultValue={brewery.breweryInfo.name}
                className={`input input-bordered input-sm w-full ${
                  errors.name ? "input-error" : ""
                }
                `}
                {...register("name", { required: true })}
              />
            </div>
            <div className={`flex flex-col col-span-2`}>
              <label htmlFor="description" className="capitalize text-sm">
                description <span className="text-error">*</span>
              </label>
              <input
                id="description"
                type="text"
                defaultValue={brewery.breweryInfo.description}
                className={`input input-bordered input-sm w-full ${
                  errors.description ? "input-error" : ""
                }
                `}
                {...register("description", { required: true })}
              />
            </div>
            <div className={`flex flex-col col-span-2`}>
              <label htmlFor="address" className="capitalize text-sm">
                address <span className="text-error">*</span>
              </label>
              <input
                id="address"
                type="text"
                defaultValue={brewery.breweryInfo.address}
                className={`input input-bordered input-sm w-full ${
                  errors.address ? "input-error" : ""
                }
                `}
                {...register("address", { required: true })}
              />
            </div>
            <div className={`flex flex-col col-span-2`}>
              <label htmlFor="website" className="capitalize text-sm">
                website <span className="text-error">*</span>
              </label>
              <input
                id="website"
                type="text"
                defaultValue={brewery.breweryInfo.website}
                className={`input input-bordered input-sm w-full ${
                  errors.website ? "input-error" : ""
                }
                `}
                {...register("website", { required: true })}
              />
            </div>
            <div className={`flex flex-col col-span-1`}>
              <label htmlFor="phoneNumber" className="capitalize text-sm">
                phoneNumber <span className="text-error">*</span>
              </label>
              <input
                id="phoneNumber"
                type="number"
                defaultValue={brewery.breweryInfo.phone_number}
                className={`input input-bordered input-sm w-full ${
                  errors.phoneNumber ? "input-error" : ""
                }
                `}
                {...register("phoneNumber", { required: true })}
              />
            </div>
            <div className={`flex flex-col col-span-1`}>
              <label htmlFor="checkInCode" className="capitalize text-sm">
                checkInCode <span className="text-error">*</span>
              </label>
              <input
                id="checkInCode"
                type="text"
                defaultValue={brewery.breweryInfo.check_in_code}
                className={`input input-bordered input-sm w-full ${
                  errors.checkInCode ? "input-error" : ""
                }
                `}
                {...register("checkInCode", { required: true })}
              />
            </div>
            <div className={`flex flex-col col-span-1`}>
              <label htmlFor="lat" className="capitalize text-sm">
                lat <span className="text-error">*</span>
              </label>
              <input
                id="lat"
                type="number"
                defaultValue={brewery.breweryInfo.lat}
                className={`input input-bordered input-sm w-full ${
                  errors.lat ? "input-error" : ""
                }
                `}
                {...register("lat", { required: true })}
              />
            </div>
            <div className={`flex flex-col col-span-1`}>
              <label htmlFor="long" className="capitalize text-sm">
                long <span className="text-error">*</span>
              </label>
              <input
                id="long"
                type="number"
                defaultValue={brewery.breweryInfo.long}
                className={`input input-bordered input-sm w-full ${
                  errors.long ? "input-error" : ""
                }
                `}
                {...register("long", { required: true })}
              />
            </div>
            <select
              className={`input input-bordered w-full  col-span-2   input-sm mt-4 ${
                errors.type ? "input-error" : ""
              }`}
              defaultValue={brewery.breweryInfo.type}
              {...register("type", { required: true })}
            >
              <option value="">Select Type</option>
              <option value="brewery">Brewery</option>
              <option value="winery">Winery</option>
              <option value="distillery">Distillery</option>
              <option value="cidery">Cidery</option>
            </select>
            <input className="btn btn-primary mt-4" type="submit" />
            {isLoading && "loading"}
          </div>
        </form>
      ) : (
        "loading"
      )}
    </PageWrapper>
  );
}
