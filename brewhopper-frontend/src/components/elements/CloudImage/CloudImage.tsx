import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fit } from "@cloudinary/url-gen/actions/resize";

interface CloudImageProps {
  image?: string;
  height: number;
  width: number;
  classes?: string;
}

export function CloudImage({ image, height, width, classes }: CloudImageProps) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dgxtj6bta",
    },
  });

  const myImage = cld.image(image);
  myImage.resize(fit().width(width).height(height));

  return (
    <AdvancedImage cldImg={myImage} className={`h-full w-full ${classes}`} />
  );
}
