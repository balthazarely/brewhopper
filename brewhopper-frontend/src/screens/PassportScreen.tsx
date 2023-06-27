import React, { useState } from "react";
import { PageHeader, PageWrapper } from "../components/elements";
import {
  useDeletePassportBreweryMutation,
  useGetUserProfileQuery,
} from "../slices/passportSlice";
import { PassportCard } from "../components/passportScreen";

export default function PassportScreen() {
  const {
    data: userPassportData,
    isLoading,
    error,
  } = useGetUserProfileQuery({});

  const [deletePassportBrewery, { isLoading: loadingDelete }] =
    useDeletePassportBreweryMutation({});

  const deletePassportItem = (id: string) => {
    deletePassportBrewery(id);
  };

  console.log(userPassportData?.beerReviews);

  return (
    <PageWrapper>
      <PageHeader title="My Passport" />
      <div className="grid grid-cols-2 md:grid-cols-3">
        {userPassportData?.breweriesVisited?.map((brewery: any) => {
          return <PassportCard brewery={brewery} key={brewery.id} />;
        })}
      </div>
      <PageHeader title="My Beer Reviews" />
      <div className="grid grid-cols-2 md:grid-cols-3">
        {userPassportData?.beerReviews?.map((review: any) => {
          return (
            <div key={review.reviewId._id}>
              <div className="font-bold">{review.reviewId.beerId.name}</div>
              <div>{review.reviewId.review}</div>
              <div>{review.reviewId.stars}</div>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
