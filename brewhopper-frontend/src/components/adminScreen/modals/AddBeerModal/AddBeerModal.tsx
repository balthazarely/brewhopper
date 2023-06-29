import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useAddBeerMutation } from "../../../../slices/beerSlice";
import {
  useUploadProductImageCloudinaryMutation,
  useUploadProductImageMutation,
} from "../../../../slices/brewerySlice";
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
  const [uploadedImage, setUploadedImage] = useState("");

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();
  const [uploadProductImageCloudinary, { isLoading: loadingUploadCloud }] =
    useUploadProductImageCloudinaryMutation();

  type Inputs = {
    name: string;
    description: string;
    style: string;
    abv: number;
    ibu: number;
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
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFileHandler = async (e: any) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      // const res = await uploadProductImage(formData).unwrap();
      const res2: any = await uploadProductImageCloudinary(formData).unwrap();
      toast.success("image uploaded");
      console.log(res2.image.public_id);
      // setUploadedImage(res.image);
      setUploadedImage(res2.image.public_id);
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

              <div className={`flex flex-col col-span-2 mt-6`}>
                <input
                  id="photo"
                  type="file"
                  onChange={(e) => uploadFileHandler(e)}
                  className="file-input file-input-sm   file-input-bordered file-input-primary w-full max-w-xs"
                />
              </div>

              <input className="btn btn-primary mt-4 " type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
