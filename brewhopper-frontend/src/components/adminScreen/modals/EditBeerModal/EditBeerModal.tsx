import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { HiX } from "react-icons/hi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUploadProductImageCloudinaryMutation } from "../../../../slices/brewerySlice";
import { useUpdateBeerMutation } from "../../../../slices/beerSlice";
import { CloudImage } from "../../../elements";
import { Beer } from "../../../../types";

interface AddBeerModalProps {
  breweryId: string;
  beerToEdit: Beer | null;
  editBeerModalOpen: boolean;
  setEditBeerModalOpen: (state: boolean) => void;
}

export function EditBeerModal({
  breweryId,
  beerToEdit,
  editBeerModalOpen,
  setEditBeerModalOpen,
}: AddBeerModalProps) {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [uploadedImage, setUploadedImage] = useState("");
  const [updateBeer] = useUpdateBeerMutation({});
  const [uploadProductImageCloudinary, { isLoading: loadingUploadCloud }] =
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (beerToEdit) {
      reset({
        name: beerToEdit.name,
        description: beerToEdit.description,
        style: beerToEdit.style,
        abv: beerToEdit.abv,
        ibu: beerToEdit.ibu,
      });
    }
  }, [beerToEdit, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newBeer = {
      ...data,
      user: userInfo?._id,
      breweryId,
      id: beerToEdit?._id,
      image: uploadedImage ? uploadedImage : beerToEdit?.image,
    };
    console.log(newBeer);

    try {
      await updateBeer(newBeer);
      setEditBeerModalOpen(false);
      toast.success("beer added");
      reset();
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
  const handleCloseModal = () => {
    reset();
    setEditBeerModalOpen(false);
    setUploadedImage("");
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={editBeerModalOpen}
        id="my-modal-6"
        className="modal-toggle relative"
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <button
            className="absolute top-2 right-2 btn btn-sm btn-ghost"
            onClick={handleCloseModal}
          >
            <HiX />
          </button>
          <div className="">
            <div className="text-2xl font-bold mb-4">Edit Beer</div>
            {beerToEdit ? (
              <form
                className="grid grid-cols-2 gap-2 mt-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className={`flex flex-col col-span-2`}>
                  <label htmlFor="name" className="capitalize text-sm">
                    name <span className="text-error">*</span>
                  </label>

                  <input
                    id="name"
                    type="text"
                    defaultValue={beerToEdit.name}
                    className={`input input-bordered input-sm w-full ${
                      errors.name ? "input-error" : ""
                    }`}
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
                    id="description"
                    type="text"
                    defaultValue={beerToEdit.description}
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
                    id="style"
                    type="text"
                    defaultValue={beerToEdit.style}
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
                    id="abv"
                    defaultValue={beerToEdit.abv}
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
                    id="ibu"
                    defaultValue={beerToEdit.ibu}
                    className={`input input-bordered input-sm w-full ${
                      errors.ibu ? "input-error" : ""
                    }`}
                    {...register("ibu")}
                  />
                </div>

                <div className="w-56 h-32  mt-3 col-span-2 rounded-lg relative">
                  <label htmlFor="photo" className="capitalize text-sm">
                    Photo
                  </label>
                  <div className="mt-4 w-40  overflow-hidden  h-40">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-40 object-contain"
                      />
                    ) : (
                      <CloudImage
                        classes="object-contain"
                        image={beerToEdit.image}
                        width={200}
                        height={200}
                      />
                    )}
                  </div>
                </div>
                <div className={`flex  col-span-2 mt-20 `}>
                  <input
                    id="photo"
                    type="file"
                    onChange={(e) => uploadFileHandler(e)}
                    className="file-input file-input-sm   file-input-bordered file-input-primary w-full max-w-xs"
                  />
                  {uploadedImageLoading && (
                    <span className="ml-2 loading loading-spinner loading-md"></span>
                  )}
                </div>

                <input
                  disabled={loadingUploadCloud}
                  className="btn btn-primary mt-4"
                  type="submit"
                />
                {/* {loadingAddBeer && "loading"} */}
              </form>
            ) : (
              "loading"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
