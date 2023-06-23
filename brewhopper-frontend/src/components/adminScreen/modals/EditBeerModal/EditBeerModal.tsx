import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { HiX } from "react-icons/hi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUploadProductImageMutation } from "../../../../slices/brewerySlice";
import { useUpdateBeerMutation } from "../../../../slices/beerSlice";

const imageUrl = "http://localhost:5001";

export function EditBeerModal({
  breweryId,
  beerToEdit,
  editBeerModalOpen,
  setEditBeerModalOpen,
}: any) {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [uploadedImage, setUploadedImage] = useState("");
  const [updateBeer, { isLoading: loadingAddBeer }] = useUpdateBeerMutation({});

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

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
      id: beerToEdit._id,
      image: uploadedImage ? uploadedImage : beerToEdit.image,
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
                    id="description"
                    type="text"
                    defaultValue={beerToEdit.description}
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
                    ibu <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    id="ibu"
                    defaultValue={beerToEdit.ibu}
                    className={`input input-bordered input-sm w-full ${
                      errors.ibu ? "input-error" : ""
                    }
  `}
                    {...register("ibu", {
                      required: true,
                    })}
                  />
                </div>

                {/* <div className={`flex flex-col  just col-span-2`}>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Seasonal</span>
                    </label>
                    <input
                      id="seasonal"
                      defaultChecked={beerToEdit.seasonal}
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      {...register("seasonal", {
                        required: false,
                      })}
                    />
                  </div>
                </div> */}
                <div className="w-full h-32 mt-3 col-span-2 rounded-lg relative">
                  <label htmlFor="photo" className="capitalize text-sm">
                    Photo
                  </label>
                  <img
                    className="h-full w-1/2 object-cover rounded-lg"
                    src={
                      uploadedImage
                        ? `${imageUrl}${uploadedImage}`
                        : `${imageUrl}${beerToEdit.image}`
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
