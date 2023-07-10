import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useAddBeerMutation } from "../../../../slices/beerSlice";
import { useUploadProductImageCloudinaryMutation } from "../../../../slices/brewerySlice";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { HiX } from "react-icons/hi";
import { CloudImage } from "../../../elements";

interface AddBeerModalProps {
  breweryId: string;
  addBeerModalOpen: boolean;
  setAddBeerModalOpen: (state: boolean) => void;
}

export function AddBeerModal({
  breweryId,
  addBeerModalOpen,
  setAddBeerModalOpen,
}: AddBeerModalProps) {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [addBeer] = useAddBeerMutation({});
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadProductImageCloudinary] =
    useUploadProductImageCloudinaryMutation();
  const [previewUrl, setPreviewUrl] = useState<any>("");
  const [uploadedImageLoading, setUploadedImageLoading] = useState(false);

  type Inputs = {
    name: string;
    description: string;
    style: string;
    abv: number;
    ibu: number;
  };

  useEffect(() => {
    reset();
    setPreviewUrl("");
  }, [addBeerModalOpen]);

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
    const file = e.target.files[0];
    const reader = new FileReader();
    setUploadedImageLoading(true);
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res2: any = await uploadProductImageCloudinary(formData).unwrap();
      toast.success("image uploaded");
      setUploadedImage(res2.image.public_id);
      setUploadedImageLoading(false);
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
                  description
                </label>
                <input
                  type="text"
                  className={`input input-bordered input-sm w-full ${
                    errors.description ? "input-error" : ""
                  }
  `}
                  {...register("description")}
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
                  ibu
                </label>
                <input
                  type="number"
                  step="any"
                  className={`input input-bordered input-sm w-full ${
                    errors.ibu ? "input-error" : ""
                  }
  `}
                  {...register("ibu")}
                />
              </div>

              <div className="w-full h-44 mt-3 col-span-2 rounded-lg relative">
                <label htmlFor="photo" className="capitalize text-sm">
                  Photo
                </label>
                {!previewUrl || !uploadedImage ? (
                  <div className="mt-4 flex justify-center items-center bg-base-200 w-72 overflow-hidden  h-40">
                    upload image
                  </div>
                ) : (
                  <div className="mt-4 w-72 overflow-hidden  h-40">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-40 object-cover"
                      />
                    ) : (
                      <CloudImage
                        classes="object-cover "
                        image={uploadedImage}
                        width={300}
                        height={400}
                      />
                    )}
                  </div>
                )}
              </div>

              <div className={`flex  col-span-2 mt-6`}>
                <input
                  id="logo"
                  type="file"
                  onChange={(e) => uploadFileHandler(e)}
                  className="file-input file-input-sm file-input-bordered file-input-primary w-full max-w-xs"
                />
                {uploadedImageLoading && (
                  <span className="loading loading-spinner ml-1 loading-md"></span>
                )}
              </div>
              <input className="btn btn-primary mt-4 " type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
