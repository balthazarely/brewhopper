import { HiX } from "react-icons/hi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUpdateUserReviewMutation } from "../../../slices/passportSlice";

interface AddBeerModalProps {
  reviewForEdit: any;
  reviewEditModalOpen: boolean;
  setReviewEditModalOpen: (state: boolean) => void;
  setReviewForEdit: (review: any) => void;
}

export function BeerReviewEditModal({
  reviewForEdit,
  reviewEditModalOpen,
  setReviewEditModalOpen,
  setReviewForEdit,
}: AddBeerModalProps) {
  const [updateUserReview] = useUpdateUserReviewMutation({});

  type Inputs = {
    review: string;
    stars: number;
  };

  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    if (reviewForEdit) {
      setRating(reviewForEdit.stars);
    } else {
      setRating(null);
    }
  }, [reviewForEdit]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const newReview = {
        ...reviewForEdit,
        review: data.review,
        stars: rating,
      };
      await updateUserReview(newReview);
      setReviewEditModalOpen(false);
      setReviewForEdit(null);
    } catch (error) {
      console.log(error);
    }
  };

  const starValues = [1, 2, 3, 4, 5];

  return (
    <div>
      <input
        type="checkbox"
        checked={reviewEditModalOpen}
        id="my-modal-6"
        className="modal-toggle relative"
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <button
            className="absolute top-2 right-2 btn btn-sm btn-ghost"
            onClick={() => {
              setReviewEditModalOpen(false);
              setReviewForEdit(null);
            }}
          >
            <HiX />
          </button>
          <div className="">
            <div className="text-2xl font-bold text-center mb-4">
              Edit Reivew
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col items-center justify-between h-96 "
            >
              <div className="w-full">
                <div className="rating mb-2 flex w-full justify-between">
                  <div className="text-lg font-bold">
                    {reviewForEdit?.beerName}
                  </div>
                  <div>
                    {starValues.map((value) => (
                      <input
                        key={value}
                        type="radio"
                        className="mask mask-star"
                        value={value}
                        {...register("stars")}
                        onChange={(e) => setRating(Number(e.target.value))}
                        checked={rating === value}
                      />
                    ))}
                  </div>
                </div>
                <textarea
                  defaultValue={reviewForEdit?.review}
                  placeholder="review"
                  className="textarea  w-full h-72 textarea-bordered textarea-primary"
                  {...register("review", { required: true })}
                />
              </div>
              <button
                className={`btn-primary btn px-2 py-1 mb-2  w-full mt-2  `}
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
