import { useState } from "react";
import {
  useDeleteUserReviewsMutation,
  useGetUserReviewsQuery,
} from "../../../slices/passportSlice";
import { ConfirmActionModal } from "../../modals";
import { FullPageLoader } from "../../elements";
import { BeerReviewsFilterPanel } from "../BeerReviewsFilterPanel";
import { BeerReviewCard } from "../BeerReviewCard";
import { BeerReviewEditModal } from "..";

interface ReviewForDeletionType {
  id: string;
  beerId: string;
  name: string;
}

export function BeerReviewsSection() {
  const { data: userReviews, isLoading: loadingUserReviewData } =
    useGetUserReviewsQuery({});
  const [deleteUserReviews, { isLoading: deleteLoading }] =
    useDeleteUserReviewsMutation({});
  const [selectedFilter, setSelectedFilter] = useState<any>({
    style: [],
    brewery: [],
  });
  const [confrimActionModalOpen, setConfrimActionModalOpen] =
    useState<boolean>(false);
  const [reviewForDeletion, setReviewForDeletion] =
    useState<ReviewForDeletionType>({
      id: "",
      beerId: "",
      name: "",
    });
  const [reviewForEdit, setReviewForEdit] = useState<any>(null);
  const [reviewEditModalOpen, setReviewEditModalOpen] =
    useState<boolean>(false);

  const deleteReview = async () => {
    await deleteUserReviews({
      _id: reviewForDeletion.id,
      beerId: reviewForDeletion.beerId ? reviewForDeletion.beerId : null,
    });
    setConfrimActionModalOpen(false);
  };

  const filteredReviews = userReviews?.filter((review: any) => {
    const beerStyleFilter =
      selectedFilter.style.length === 0 ||
      selectedFilter.style.includes(review.style);
    const breweryFilter =
      selectedFilter.brewery.length === 0 ||
      selectedFilter.brewery.includes(review.breweryName);
    return beerStyleFilter && breweryFilter;
  });

  const handleEditReview = (review: any) => {
    setReviewForEdit(review);
    setReviewEditModalOpen(true);
  };

  if (loadingUserReviewData) {
    return <FullPageLoader classes="h-56" />;
  }

  if (userReviews?.length === 0) {
    return (
      <div className="w-full flex-col text-xl flex justify-center items-center h-44 ">
        <div> No beer reviews yet!</div>
        <div className="text-sm mt-2">
          To get started, head to a brewery and click "Check In".
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative ">
        <BeerReviewsFilterPanel
          setSelectedFilter={setSelectedFilter}
          userReviews={userReviews}
          selectedFilter={selectedFilter}
        />
        <div className=" col-span-4  overflow-y-auto">
          {filteredReviews?.map((reviewItem: any) => {
            return (
              <BeerReviewCard
                review={reviewItem}
                key={reviewItem._id}
                setReviewForDeletion={setReviewForDeletion}
                setConfrimActionModalOpen={setConfrimActionModalOpen}
                handleEditReview={handleEditReview}
              />
            );
          })}
        </div>
      </div>
      <BeerReviewEditModal
        reviewEditModalOpen={reviewEditModalOpen}
        setReviewEditModalOpen={setReviewEditModalOpen}
        reviewForEdit={reviewForEdit}
        setReviewForEdit={setReviewForEdit}
      />

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
