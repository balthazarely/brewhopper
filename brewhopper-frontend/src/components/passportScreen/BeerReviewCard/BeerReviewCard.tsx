import { convertToReadableDate } from "../../../utils/dateFuncitons";

const imageUrl = "http://localhost:5001";

export function BeerReviewCard({
  review,
  setReviewForDeletion,
  setConfrimActionModalOpen,
}: any) {
  const number = 5;
  const iterableArray = Array.from({ length: number }, (_, index) => index);

  return (
    <div className={`cursor-pointer flex col-auto gap-2 p-2 rounded-lg shadow`}>
      <div className=" w-24 h-32  rounded-lg relative">
        <img
          className="h-full w-24 py-4 object-contain rounded-md"
          src={`${imageUrl}${review?.beerId?.image}`}
          alt="brewery-image"
        />
      </div>
      <div className="flex flex-col justify-between py-1 flex-1 ">
        <div>
          <div className="flex justify-between">
            <div className="font-extrabold text-lg">{review?.beerId?.name}</div>
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
                  beerId: review.beerId._id,
                  name: review.beerId.name,
                });
                setConfrimActionModalOpen(true);
              }}
            >
              Delete
            </button>
            <button disabled className="btn btn-xs join-item">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
