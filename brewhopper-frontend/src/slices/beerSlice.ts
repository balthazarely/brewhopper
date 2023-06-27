import {
  BEER_REVIEW_URL,
  BEER_URL,
  BREWERY_URL,
  UPLOAD_URL,
} from "../constants";
import { apiSlice } from "./apiSlice";

export const beerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBeer: builder.query({
      query: (beerId) => ({
        url: `${BEER_URL}/${beerId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Beers"],
    }),
    addBeer: builder.mutation({
      query: (data) => ({
        url: `${BEER_URL}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Breweries", "Beers"],
    }),
    updateBeer: builder.mutation({
      query: (data) => ({
        url: `${BEER_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Breweries", "Beers"],
    }),
    deleteBeer: builder.mutation({
      query: (body) => ({
        url: `${BEER_URL}/${body.id}`,
        method: "DELETE",
        body: {
          breweryId: body.breweryId,
        },
      }),
      invalidatesTags: ["Breweries", "Beers"],
    }),
    reviewBeer: builder.mutation({
      query: (data) => ({
        url: `${BEER_REVIEW_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Beers", "Passport"],
    }),
  }),
});

export const {
  useDeleteBeerMutation,
  useGetBeerQuery,
  useAddBeerMutation,
  useUpdateBeerMutation,
  useReviewBeerMutation,
} = beerApiSlice;
