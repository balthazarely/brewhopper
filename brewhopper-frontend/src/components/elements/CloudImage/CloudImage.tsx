import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fit } from "@cloudinary/url-gen/actions/resize";

export function CloudImage({ image, height, width, classes }: any) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dgxtj6bta",
    },
  });

  const myImage = cld.image(image);
  myImage.resize(fit().width(width).height(height));

  // .quality(50);
  return (
    <AdvancedImage cldImg={myImage} className={`h-full w-full ${classes}`} />
  );
}
