import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBreweryQuery,
  useUpdatedBreweryMutation,
  useUploadProductImageCloudinaryMutation,
} from "../../slices/brewerySlice";
import {
  FullPageLoader,
  PageHeader,
  PageWrapper,
} from "../../components/elements";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { AdminBeerPanel, AdminBreweryInfo } from "../../components/adminScreen";

export type BreweryInputs = {
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
  const navigate = useNavigate();
  const [updateBrewery] = useUpdatedBreweryMutation();
  const { id: breweryId } = useParams();
  const { data: brewery, isLoading } = useGetBreweryQuery(breweryId);
  const [uploadProductImageCloudinary] =
    useUploadProductImageCloudinaryMutation();

  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadedLogo, setUploadedLogo] = useState("");
  const [previewUrl, setPreviewUrl] = useState<any>("");
  const [previewUrlLogo, setPreviewUrlLogo] = useState<any>("");
  const [uploadedImageLoading, setUploadedImageLoading] = useState(false);
  const [uploadedLogoLoading, setUploadedLogoLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BreweryInputs>();

  const onSubmit: SubmitHandler<BreweryInputs> = async (data) => {
    const udpatedBrewery = {
      ...data,
      breweryId: breweryId,
      user: brewery?.user,
      image: uploadedImage ? uploadedImage : brewery.image,
      logoImage: uploadedLogo ? uploadedLogo : brewery.logoImage,
    };
    await updateBrewery(udpatedBrewery);
    navigate("/admin");
  };

  const uploadFileHandler = async (e: any, imageType: string) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (imageType === "image") {
      setUploadedImageLoading(true);
    }
    if (imageType === "logo") {
      setUploadedLogoLoading(true);
    }
    reader.onload = () => {
      if (imageType === "image") {
        setPreviewUrl(reader.result);
      }
      if (imageType === "logo") {
        setPreviewUrlLogo(reader.result);
      }
    };
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res2: any = await uploadProductImageCloudinary(formData).unwrap();
      if (imageType === "image") {
        toast.success("image uploaded");
        setUploadedImage(res2.image.public_id);
        setUploadedImageLoading(false);
      }
      if (imageType === "logo") {
        toast.success("logo uploaded");
        setUploadedLogo(res2.image.public_id);
        setUploadedLogoLoading(false);
      }
    } catch (error) {
      toast.error("error");
    }
  };

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <PageWrapper>
      <PageHeader title={`${brewery?.name} Dashboard`} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  ">
        <div className="bg-base-100 p-4 rounded-lg">
          <AdminBreweryInfo
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            brewery={brewery}
            errors={errors}
            register={register}
            previewUrl={previewUrl}
            previewUrlLogo={previewUrlLogo}
            isLoading={isLoading}
            uploadFileHandler={uploadFileHandler}
            uploadedImageLoading={uploadedImageLoading}
            uploadedLogoLoading={uploadedLogoLoading}
          />
        </div>
        <AdminBeerPanel
          breweryId={brewery?._id}
          isLoading={isLoading}
          beers={brewery?.beers}
        />
      </div>
    </PageWrapper>
  );
}
