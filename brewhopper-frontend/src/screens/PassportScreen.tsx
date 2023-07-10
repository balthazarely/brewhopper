import { PageHeader, PageWrapper } from "../components/elements";
import {
  BeerReviewsSection,
  PassportSection,
} from "../components/passportScreen";
import { useState } from "react";
import { AchievementsSection } from "../components/passportScreen/AchievementsSection";
import { useGetUserProfileQuery } from "../slices/passportSlice";

export default function PassportScreen() {
  const { data: userPassportData } = useGetUserProfileQuery({});
  const [activeTab, setActiveTab] = useState<string>("passport");
  return (
    <PageWrapper>
      <PageHeader title="My Passport" />
      <div className="flex">
        <div className="tabs tabs-boxed ">
          <a
            className={`tab ${activeTab === "passport" && "tab-active"}`}
            onClick={() => setActiveTab("passport")}
          >
            Passport
          </a>
          <a
            className={`tab ${activeTab === "reviews" && "tab-active"}`}
            onClick={() => setActiveTab("reviews")}
          >
            Beer Reviews
          </a>
          <a
            className={`tab ${activeTab === "achievements" && "tab-active"}`}
            onClick={() => setActiveTab("achievements")}
          >
            My Achievements
          </a>
        </div>
      </div>
      {activeTab === "passport" && (
        <PassportSection userPassportData={userPassportData} />
      )}
      {activeTab === "reviews" && <BeerReviewsSection />}
      {activeTab === "achievements" && (
        <AchievementsSection userPassportData={userPassportData} />
      )}
    </PageWrapper>
  );
}
