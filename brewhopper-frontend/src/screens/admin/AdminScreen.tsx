import { AdminBreweryCard } from "../../components/adminScreen";
import { ConfirmActionModal } from "../../components/adminScreen/modals";
import { PageHeader, PageWrapper } from "../../components/elements";
import {
  useDeleteBreweryMutation,
  useGetBreweriesQuery,
} from "../../slices/brewerySlice";
import { useState } from "react";

import { Link } from "react-router-dom";

export default function AdminScreen() {
  const { data: breweries, isLoading, refetch } = useGetBreweriesQuery({});
  const [deleteBreweryModalOpen, setDeleteBreweryModalOpen] = useState(false);
  const [breweryToDelete, setBreweryToDelete] = useState<any>({});
  const [confrimActionModalOpen, setConfrimActionModalOpen] = useState(false);

  const [deleteBrewery, { isLoading: loadingDelete }] =
    useDeleteBreweryMutation({});

  const deleteBreweryHandler = async () => {
    await deleteBrewery(breweryToDelete.id);
    setConfrimActionModalOpen(false);
  };

  const handleDeleteBrewery = (id: String, name: String) => {
    setConfrimActionModalOpen(true);
    setBreweryToDelete({ id, name });
  };

  return (
    <>
      <PageWrapper>
        <PageHeader title="Admin Dashboard" />
        <div className="my-4">
          <Link to={"/admin/create-brewery"} className="btn btn-sm">
            Create New Listing
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {breweries?.map((brewery: any) => {
            return (
              <AdminBreweryCard
                key={brewery._id}
                brewery={brewery}
                handleDeleteBrewery={handleDeleteBrewery}
              />
            );
          })}
        </div>
      </PageWrapper>
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
