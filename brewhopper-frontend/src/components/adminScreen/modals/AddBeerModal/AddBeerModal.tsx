import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useAddBeerMutation } from "../../../../slices/beerSlice";
import { useUploadProductImageMutation } from "../../../../slices/brewerySlice";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { HiX } from "react-icons/hi";

export function AddBeerModal({
  breweryId,
  addBeerModalOpen,
  setAddBeerModalOpen,
}: any) {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [addBeer, { isLoading: loadingAddBeer }] = useAddBeerMutation({});
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();
  const [uploadedImage, setUploadedImage] = useState("");

  type Inputs = {
    name: string;
    description: string;
    style: string;
    abv: number;
    ibu: number;
    seasonal: boolean;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newBeer = {
      ...data,
      user: userInfo?._id,
      breweryId,
      image: uploadedImage,
    };
    try {
      await addBeer(newBeer);
      setAddBeerModalOpen(false);
      reset();
    } catch (error) {
      console.log(error);
    }
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
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={addBeerModalOpen}
        id="my-modal-6"
        className="modal-toggle relative"
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <button
            className="absolute top-2 right-2 btn btn-sm btn-ghost"
            onClick={() => setAddBeerModalOpen(false)}
          >
            <HiX />
          </button>

          <div className="">
            <div className="text-2xl font-bold mb-4">Add Beer</div>
            <form
              className="grid grid-cols-2 gap-2 mt-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={`flex flex-col col-span-2`}>
                <label htmlFor="name" className="capitalize text-sm">
                  name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered input-sm w-full ${
                    errors.name ? "input-error" : ""
                  }
  `}
                  {...register("name", {
                    required: true,
                  })}
                />
              </div>

              <div className={`flex flex-col col-span-2`}>
                <label htmlFor="description" className="capitalize text-sm">
                  description <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered input-sm w-full ${
                    errors.description ? "input-error" : ""
                  }
  `}
                  {...register("description", {
                    required: true,
                  })}
                />
              </div>

              <div className={`flex flex-col col-span-2`}>
                <label htmlFor="style" className="capitalize text-sm">
                  style <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered input-sm w-full ${
                    errors.style ? "input-error" : ""
                  }
  `}
                  {...register("style", {
                    required: true,
                  })}
                />
              </div>

              <div className={`flex flex-col col-span-1`}>
                <label htmlFor="abv" className="capitalize text-sm">
                  abv <span className="text-error">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  className={`input input-bordered input-sm w-full ${
                    errors.abv ? "input-error" : ""
                  }
  `}
                  {...register("abv", {
                    required: true,
                  })}
                />
              </div>

              <div className={`flex flex-col col-span-1`}>
                <label htmlFor="ibu" className="capitalize text-sm">
                  ibu <span className="text-error">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  className={`input input-bordered input-sm w-full ${
                    errors.ibu ? "input-error" : ""
                  }
  `}
                  {...register("ibu", {
                    required: true,
                  })}
                />
              </div>

              <div className={`flex flex-col  just col-span-2`}>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Seasonal</span>
                  </label>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    {...register("seasonal", {
                      required: false,
                    })}
                  />
                </div>
              </div>

              {/* <div className="w-full h-32 mt-3 col-span-2 rounded-lg relative">
  <label htmlFor="photo" className="capitalize text-sm">
    Photo
  </label>
  <img
    className="h-full w-1/2 object-cover rounded-lg"
    src={`${imageUrl}${uploadedImage}`}
    alt="brewery-image"
  />
</div> */}
              <div className={`flex flex-col col-span-2 mt-6`}>
                <input
                  id="photo"
                  type="file"
                  onChange={(e) => uploadFileHandler(e)}
                  className="file-input file-input-sm   file-input-bordered file-input-primary w-full max-w-xs"
                />
              </div>

              <input className="btn btn-primary mt-4" type="submit" />
              {loadingAddBeer && "loading"}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
