import { BeerReviewFilter } from "..";

export function BeerReviewsFilterPanel({
  setSelectedFilter,
  userReviews,
  selectedFilter,
}: any) {
  const handleIt = (item: any, name: any) => {
    setSelectedFilter((prevState: any) => ({
      ...prevState,
      [name]: prevState[name].includes(item)
        ? prevState[name].filter((f: any) => f !== item)
        : [...prevState[name], item],
    }));
  };

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

  return (
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
  );
}
