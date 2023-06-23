import { BEER_URL, BREWERY_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const beerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBeersAtBrewery: builder.query({
      query: (breweryId) => ({
        url: `${BEER_URL}/${breweryId}`,
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
      invalidatesTags: ["Beers"],
    }),
    updateBeer: builder.mutation({
      query: (data) => ({
        url: `${BEER_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Beers"],
    }),
    deleteBeer: builder.mutation({
      query: (beerId) => ({
        url: `${BEER_URL}/${beerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Beers"],
    }),
  }),
});

export const {
  useDeleteBeerMutation,
  useAddBeerMutation,
  useUpdateBeerMutation,
  useGetBeersAtBreweryQuery,
} = beerApiSlice;
