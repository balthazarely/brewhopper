import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBreweryQuery,
  useUpdatedBreweryMutation,
  useUploadProductImageCloudinaryMutation,
} from "../../slices/brewerySlice";
import { CloudImage, PageHeader, PageWrapper } from "../../components/elements";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { AdminBeerPanel, AdminBreweryInfo } from "../../components/adminScreen";

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

export default function AdminEditBreweryScreen() {
  const { id: breweryId } = useParams();
  const { data: brewery, isLoading } = useGetBreweryQuery(breweryId);
  const [uploadedImage, setUploadedImage] = useState("");
  const navigate = useNavigate();
  const [updateBrewery] = useUpdatedBreweryMutation();

  const [uploadProductImageCloudinary, { isLoading: loadingUploadCloud }] =
    useUploadProductImageCloudinaryMutation();

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
  const [previewUrl, setPreviewUrl] = useState<any>("");

  const uploadFileHandler = async (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
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
    } catch (error) {
      toast.error("error");
    }
  };

  console.log(brewery, "brewery");

  return (
    <PageWrapper>
      <PageHeader title={`${brewery?.name} Dashboard`} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  ">
        <div className="bg-base-100 p-4 rounded-lg">
          {!isLoading ? (
            <AdminBreweryInfo
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              brewery={brewery}
              errors={errors}
              register={register}
              previewUrl={previewUrl}
              isLoading={isLoading}
              CloudImage={CloudImage}
              uploadFileHandler={uploadFileHandler}
            />
          ) : (
            "loading"
          )}
        </div>
        <AdminBeerPanel
          breweryId={breweryId}
          isLoading={isLoading}
          beers={brewery?.beers}
        />
      </div>
    </PageWrapper>
  );
}
