import { useState } from "react";
import { BeerReviewCard } from "..";
import {
  useDeleteUserReviewsMutation,
  useGetUserReviewsQuery,
} from "../../../slices/passportSlice";
import { ConfirmActionModal } from "../../modals";

export function BeerReviewsSection() {
  const [deleteUserReviews, { isLoading: deleteLoading }] =
    useDeleteUserReviewsMutation({});
  const { data: userReviews } = useGetUserReviewsQuery({});
  const [confrimActionModalOpen, setConfrimActionModalOpen] = useState(false);
  const [reviewForDeletion, setReviewForDeletion] = useState({
    id: "",
    beerId: "",
    name: "",
  });

  const deleteReview = async () => {
    await deleteUserReviews({
      _id: reviewForDeletion.id,
      beerId: reviewForDeletion.beerId,
    });
    setConfrimActionModalOpen(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {userReviews?.map((reviewItem: any) => {
          return (
            <BeerReviewCard
              review={reviewItem}
              key={reviewItem._id}
              setReviewForDeletion={setReviewForDeletion}
              setConfrimActionModalOpen={setConfrimActionModalOpen}
            />
          );
        })}
      </div>
      <ConfirmActionModal
        message={`Are you sure you want to delete review for ${reviewForDeletion.name}?`}
        confirmText="Delete"
        loading={deleteLoading}
        confrimActionModalOpen={confrimActionModalOpen}
        setConfrimActionModalOpen={setConfrimActionModalOpen}
        onFireFunction={deleteReview}
      />
    </div>
  );
}
