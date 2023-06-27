export function BeerReviewFilter({
  name,
  filterItem,
  selectedFilters,
  handleFilterClick,
}: any) {
  return (
    <>
      <div className="font-bold text-sm capitalize mt-4">{name}</div>
      {filterItem?.map((item: any) => {
        return (
          <div className="flex items-center" key={item}>
            <input
              type="checkbox"
              id={item}
              checked={selectedFilters[name].includes(item)}
              onChange={() => handleFilterClick(item, name)}
              className="checkbox checkbox-sm"
            />
            <label htmlFor={item} className="label text-xs font-bold">
              {item}
            </label>
          </div>
        );
      })}
    </>
  );
}
