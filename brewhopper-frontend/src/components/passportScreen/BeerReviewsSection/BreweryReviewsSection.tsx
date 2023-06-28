import { useState } from "react";
import { BeerReviewCard, BeerReviewFilter } from "..";
import {
  useDeleteUserReviewsMutation,
  useGetUserReviewsQuery,
} from "../../../slices/passportSlice";
import { ConfirmActionModal } from "../../modals";

export function BeerReviewsSection() {
  const { data: userReviews, isLoading: loadingUserReviewData } =
    useGetUserReviewsQuery({});
  const [deleteUserReviews, { isLoading: deleteLoading }] =
    useDeleteUserReviewsMutation({});
  const [confrimActionModalOpen, setConfrimActionModalOpen] = useState(false);
  const [reviewForDeletion, setReviewForDeletion] = useState({
    id: "",
    beerId: "",
    name: "",
  });

  // TODO: if the beerID doesnt exist, meaning the beer was deleted, send null and deal with it on the backend
  const deleteReview = async () => {
    await deleteUserReviews({
      _id: reviewForDeletion.id,
      beerId: reviewForDeletion.beerId ? reviewForDeletion.beerId : null,
    });
    setConfrimActionModalOpen(false);
  };

  // FIlter
  const [selectedFilter, setSelectedFilter] = useState<any>({
    style: [],
    brewery: [],
  });

  const handleIt = (item: any, name: any) => {
    setSelectedFilter((prevState: any) => ({
      ...prevState,
      [name]: prevState[name].includes(item)
        ? prevState[name].filter((f: any) => f !== item)
        : [...prevState[name], item],
    }));
  };
  console.log(userReviews);

  const beerStyles: string[] = [
    ...(new Set(
      userReviews?.map((review: any) => review?.beerId?.style)
    ) as Set<string>),
  ];

  const breweries: string[] = [
    ...(new Set(
      userReviews?.map((review: any) => review.breweryId.name)
    ) as Set<string>),
  ];

  const filteredReviews = userReviews?.filter((review: any) => {
    const beerStyleFilter =
      selectedFilter.style.length === 0 ||
      selectedFilter.style.includes(review.style);

    const breweryFilter =
      selectedFilter.brewery.length === 0 ||
      selectedFilter.brewery.includes(review.breweryName);

    return beerStyleFilter && breweryFilter;
  });

  return (
    <div className="mt-4">
      {!loadingUserReviewData ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative ">
          <div className=" col-span-1 rounded-lg p-2 ">
            <BeerReviewFilter
              name="style"
              filterItem={beerStyles}
              handleFilterClick={handleIt}
              selectedFilters={selectedFilter}
            />
            <BeerReviewFilter
              name="brewery"
              filterItem={breweries}
              handleFilterClick={handleIt}
              selectedFilters={selectedFilter}
            />
          </div>

          <div className=" col-span-4  overflow-y-auto">
            {filteredReviews?.map((reviewItem: any) => {
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
        </div>
      ) : (
        <div className="w-full h-72  flex justify-center items-center">
          <div className="loading loading-spinner  loading-lg"></div>
        </div>
      )}
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
