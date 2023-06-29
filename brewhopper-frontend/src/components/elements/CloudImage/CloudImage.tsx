import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fit } from "@cloudinary/url-gen/actions/resize";

export function CloudImage({ image, height, width }: any) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dgxtj6bta",
    },
  });

  const myImage = cld.image(image);
  myImage.resize(fit().width(width).height(height));

  return <AdvancedImage cldImg={myImage} />;
}
