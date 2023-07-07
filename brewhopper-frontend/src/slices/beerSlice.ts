import { BEER_REVIEW_URL, BEER_URL } from "../constants";
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

    // ADMIN - Adding beer to brewery
    addBeer: builder.mutation({
      query: (data) => ({
        url: `${BEER_URL}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Breweries", "Beers"],
    }),
    // ADMIN - Updaing beer
    updateBeer: builder.mutation({
      query: (data) => ({
        url: `${BEER_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Breweries", "Beers"],
    }),
    // ADMIN - Deleting beer
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

    // PUBLIC - User adding beer review
    reviewBeer: builder.mutation({
      query: (data) => ({
        url: `${BEER_REVIEW_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Beers", "Passport"],
    }),

    // PUBLIC - Get all user reviews
    getSingleBeerReviewsByUser: builder.query({
      query: (beerId) => ({
        url: `${BEER_REVIEW_URL}/${beerId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Beers"],
    }),
  }),
});

export const {
  useDeleteBeerMutation,
  useGetBeerQuery,
  useAddBeerMutation,
  useUpdateBeerMutation,
  useReviewBeerMutation,
  useGetSingleBeerReviewsByUserQuery,
} = beerApiSlice;
