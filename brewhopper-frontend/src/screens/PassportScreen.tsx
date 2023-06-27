import { PageHeader, PageWrapper } from "../components/elements";
import {
  useDeletePassportBreweryMutation,
  useGetUserProfileQuery,
} from "../slices/passportSlice";
import {
  BeerReviewsSection,
  PassportSection,
} from "../components/passportScreen";
import { useState } from "react";

export default function PassportScreen() {
  const [activeTab, setActiveTab] = useState("passport");
  const {
    data: userPassportData,
    isLoading,
    error,
  } = useGetUserProfileQuery({});
  const [deletePassportBrewery, { isLoading: loadingDelete }] =
    useDeletePassportBreweryMutation({});

  return (
    <PageWrapper>
      <PageHeader title="My Passport" />
      <div className="tabs ">
        <a
          className={`tab tab-bordered ${
            activeTab === "passport" && "tab-active"
          }`}
          onClick={() => setActiveTab("passport")}
        >
          Passport
        </a>
        <a
          className={`tab tab-bordered ${
            activeTab === "reviews" && "tab-active"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Beer Reviews
        </a>
      </div>
      {activeTab === "passport" && (
        <PassportSection userPassportData={userPassportData} />
      )}
      {activeTab === "reviews" && <BeerReviewsSection />}
    </PageWrapper>
  );
}
