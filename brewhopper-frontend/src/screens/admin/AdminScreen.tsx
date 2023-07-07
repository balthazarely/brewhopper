import {
  AdminAchievementCard,
  AdminBreweryCard,
} from "../../components/adminScreen";
import {
  AddAchievementsModal,
  AddBreweryModal,
  ConfirmActionModal,
} from "../../components/adminScreen/modals";
import {
  FullPageLoader,
  PageHeader,
  PageWrapper,
} from "../../components/elements";
import { useGetAchievementsQuery } from "../../slices/achievementSlice";
import {
  useDeleteBreweryMutation,
  useGetBreweriesQuery,
} from "../../slices/brewerySlice";
import { useState } from "react";
import { Brewery } from "../../types";

export default function AdminScreen() {
  const [activeTab, setActiveTab] = useState<string>("breweries");
  const [addBreweryModalOpen, setAddBreweryModalOpen] =
    useState<boolean>(false);
  const [addAchievementsModalOpen, setAddAchievementsModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <PageWrapper>
        <PageHeader title="Admin Dashboard" />
        <div>
          <div className="tabs tabs-boxed ">
            <a
              className={`tab ${activeTab === "breweries" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("breweries")}
            >
              Breweries
            </a>
            <a
              className={`tab ${
                activeTab === "achievements" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("achievements")}
            >
              Achievements
            </a>
          </div>
        </div>
        {activeTab === "breweries" && <BrewerySection />}
        {activeTab === "achievements" && <AchievementSection />}
      </PageWrapper>
      <AddBreweryModal
        addBreweryModalOpen={addBreweryModalOpen}
        setAddBreweryModalOpen={setAddBreweryModalOpen}
      />
      <AddAchievementsModal
        addAchievementsModalOpen={addAchievementsModalOpen}
        setAddAchievementsModalOpen={setAddAchievementsModalOpen}
      />
    </>
  );

  function AchievementSection() {
    const { data: achievements, isLoading: isLoadingAchievements } =
      useGetAchievementsQuery({});

    if (isLoadingAchievements) {
      return <FullPageLoader classes="h-56" />;
    }

    return (
      <>
        <button
          onClick={() => setAddAchievementsModalOpen(true)}
          className="btn btn-sm my-4"
        >
          Create New Achievement
        </button>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievements?.map((achievement: any) => {
            return (
              <AdminAchievementCard
                key={achievement._id}
                achievement={achievement}
              />
            );
          })}
        </div>
      </>
    );
  }

  function BrewerySection() {
    const { data: breweries, isLoading: isLoadingBreweries } =
      useGetBreweriesQuery({});
    const [breweryToDelete, setBreweryToDelete] = useState<any>({});
    const [confrimActionModalOpen, setConfrimActionModalOpen] =
      useState<boolean>(false);

    // Open modal + pass ID/Name to delete
    const handleDeleteBrewery = (id: string, name: string) => {
      setConfrimActionModalOpen(true);
      setBreweryToDelete({ id, name });
    };

    // Actually delete When asked for confirmation
    const [deleteBrewery, { isLoading: loadingDelete }] =
      useDeleteBreweryMutation({});

    const deleteBreweryHandler = async () => {
      await deleteBrewery(breweryToDelete.id);
      setConfrimActionModalOpen(false);
    };

    if (isLoadingBreweries) {
      return <FullPageLoader classes="h-56" />;
    }

    return (
      <>
        <button
          onClick={() => setAddBreweryModalOpen(true)}
          className="btn btn-sm my-4"
        >
          Create New Listing
        </button>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {breweries?.map((brewery: Brewery) => {
            return (
              <AdminBreweryCard
                key={brewery._id}
                brewery={brewery}
                handleDeleteBrewery={handleDeleteBrewery}
              />
            );
          })}
        </div>
        <ConfirmActionModal
          message={`Are you sure you want to delete ${breweryToDelete?.name}?`}
          confirmText="Delete"
          loading={loadingDelete}
          confrimActionModalOpen={confrimActionModalOpen}
          setConfrimActionModalOpen={setConfrimActionModalOpen}
          onFireFunction={deleteBreweryHandler}
        />
      </>
    );
  }
}
