import { useParams } from "react-router-dom";
import { PageHeader, PageWrapper } from "../components/elements";
import { useState } from "react";
import { useGetBeerQuery } from "../slices/beerSlice";

export default function BeerScreen() {
  const { id } = useParams();
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const { data: beer, isLoading, error } = useGetBeerQuery(id);
  const imageUrl = "http://localhost:5001";

  return (
    <PageWrapper>
      {!isLoading ? (
        <div>
          <PageHeader title={beer.name} />
          <div className="w-56 h-56 overflow-hidden  mt-2 rounded-lg relative">
            <img
              className="h-full w-full  object-contain rounded-lg"
              src={`${imageUrl}${beer.image}`}
              alt="brewery-image"
            />
          </div>
          <div>style : {beer.style}</div>
          <div>ABV : {beer.abv}</div>
          <div>IBU : {beer.ibu}</div>
          <div className="mt-8">Reiews</div>
          <div>
            {beer?.reviews.map((review: any) => {
              return (
                <div className="flex gap-6">
                  <div>{review.stars} stars</div>
                  <div>{review.review}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        "loading"
      )}
    </PageWrapper>
  );
}
