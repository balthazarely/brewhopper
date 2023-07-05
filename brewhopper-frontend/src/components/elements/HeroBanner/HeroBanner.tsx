import { CloudImage } from "..";

export function HeroBanner({ image, classes }: any) {
  return (
    <div className="w-full overflow-hidden justify-center items-center flex md:h-64 lg:h-80 h-56 bg-gray-300  relative">
      <CloudImage classes={classes} image={image} width={800} height={800} />
    </div>
  );
}
