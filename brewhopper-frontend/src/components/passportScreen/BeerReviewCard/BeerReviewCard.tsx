import { convertToReadableDate } from "../../../utils/dateFuncitons";
import { CloudImage } from "../../elements";

export function BeerReviewCard({
  review,
  setReviewForDeletion,
  setConfrimActionModalOpen,
  handleEditReview,
}: any) {
  const number = 5;
  const iterableArray = Array.from({ length: number }, (_, index) => index);

  return (
    <div
      className={`cursor-pointer flex col-auto gap-2 p-2 rounded-lg shadow `}
    >
      <div className=" w-24 h-32  flex justify-center items-center    rounded-lg relative">
        {review?.beerId?.image ? (
          <CloudImage
            classes="object-contain"
            image={review?.beerId?.image}
            width={115}
            height={115}
          />
        ) : (
          <div className="w-full h-full bg-error"></div>
        )}
      </div>
      <div className="flex flex-col justify-between py-1 flex-1 ">
        <div>
          <div className="flex justify-between">
            <div className={`font-extrabold text-lg`}>
              {review?.beerName}{" "}
              {review.beerId === null && (
                <span className="text-error text-sm italic font-normal">
                  discontinued
                </span>
              )}
            </div>
            <div className="rating">
              {iterableArray?.map((_: any, index: number) => {
                return (
                  <input
                    key={index}
                    disabled
                    type="radio"
                    name={`rating-1-${index}`}
                    className="mask mask-star"
                    checked={index + 1 === review?.stars}
                  />
                );
              })}
            </div>
          </div>
          <div className="text-sm">{review?.review} </div>
        </div>
        <div className="flex justify-between join items-center">
          <div className="text-xs italic">
            Reviewed on {convertToReadableDate(review?.timestamp)}
          </div>
          <div>
            <button
              className="btn btn-xs join-item"
              onClick={() => {
                setReviewForDeletion({
                  id: review._id,
                  beerId: review?.beerId?._id ? review.beerId._id : null,
                  name: review.beerName,
                });
                setConfrimActionModalOpen(true);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => handleEditReview(review)}
              className="btn btn-xs join-item"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
