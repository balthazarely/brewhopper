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
    console.log(id);
    deletePassportBrewery(id);
  };

  return (
    <PageWrapper>
      <PageHeader title="My Passport" />
      {userPassportData?.breweriesVisited?.map((brewery: any) => {
        return (
          <button
            onClick={() => deletePassportItem(brewery._id)}
            className="btn btn-primary"
          >
            {brewery.breweryName}
          </button>
        );
        // return <PassportCard brewery={brewery} key={brewery.id} />;
      })}
      {/* {JSON.stringify(userData)} */}
    </PageWrapper>
  );
}
