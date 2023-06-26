import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBreweryQuery,
  useUpdatedBreweryMutation,
  useUploadProductImageMutation,
} from "../../slices/brewerySlice";
import { PageHeader, PageWrapper } from "../../components/elements";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import AdminEditBeers from "./AdminEditBeers";

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
const imageUrl = "http://localhost:5001";

export default function AdminEditBreweryScreen() {
  const { id: breweryId } = useParams();
  const { data: brewery, isLoading } = useGetBreweryQuery(breweryId);
  const [uploadedImage, setUploadedImage] = useState("");
  const navigate = useNavigate();
  const [updateBrewery] = useUpdatedBreweryMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();
  console.log(brewery);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const udpatedBrewery = {
      ...data,
      breweryId: breweryId,
      user: brewery?.user,
      image: uploadedImage ? uploadedImage : brewery.image,
    };
    await updateBrewery(udpatedBrewery);
    navigate("/admin");
  };

  const uploadFileHandler = async (e: any) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("image uploaded");
      setUploadedImage(res.image);
    } catch (error) {
      toast.error("error");
      console.error(error, "err");
    }
  };
  console.log(brewery);

  return (
    <PageWrapper>
      <PageHeader title={`${brewery?.name} Dashboard`} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  ">
        <div className="bg-base-100 p-4 rounded-lg">
          {!isLoading ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              // onSubmit={(e) => handleSaveChanges(e)}
              className="flex flex-col max-w-lg w-full"
            >
              <h2 className="text-xl w-full font-bold">Edit listing</h2>
              <div className="grid grid-cols-2 gap-2 mt-6">
                <div className={`flex flex-col col-span-2`}>
                  <label htmlFor="name" className="capitalize text-sm">
                    name <span className="text-error">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    defaultValue={brewery.name}
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
                    defaultValue={brewery.description}
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
                    defaultValue={brewery.address}
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
                    defaultValue={brewery.website}
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
                    defaultValue={brewery.phone_number}
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
                    defaultValue={brewery.check_in_code}
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
                    defaultValue={brewery.lat}
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
                    defaultValue={brewery.long}
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
                  defaultValue={brewery.type}
                  {...register("type", { required: true })}
                >
                  <option value="">Select Type</option>
                  <option value="brewery">Brewery</option>
                  <option value="winery">Winery</option>
                  <option value="distillery">Distillery</option>
                  <option value="cidery">Cidery</option>
                </select>

                <div className="w-full h-32 mt-3 col-span-2 rounded-lg relative">
                  <label htmlFor="photo" className="capitalize text-sm">
                    Photo
                  </label>
                  <img
                    className="h-full w-1/2 object-cover rounded-lg"
                    src={
                      uploadedImage
                        ? `${imageUrl}${uploadedImage}`
                        : `${imageUrl}${brewery.image}`
                    }
                    alt="brewery-image"
                  />
                </div>
                <div className={`flex flex-col col-span-2 mt-6`}>
                  <input
                    id="photo"
                    type="file"
                    onChange={(e) => uploadFileHandler(e)}
                    className="file-input file-input-sm   file-input-bordered file-input-primary w-full max-w-xs"
                  />
                </div>

                <input className="btn btn-primary mt-4" type="submit" />
                {isLoading && "loading"}
              </div>
            </form>
          ) : (
            "loading"
          )}
        </div>
        <AdminEditBeers />
      </div>
    </PageWrapper>
  );
}
