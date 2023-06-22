import { BREWERY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const breweryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBreweries: builder.query({
      query: () => ({
        url: BREWERY_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Breweries"],
    }),
    getBrewery: builder.query({
      query: (breweryId) => ({
        url: `${BREWERY_URL}/${breweryId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Breweries"],
    }),
    createBrewery: builder.mutation({
      query: (data) => ({
        url: BREWERY_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Breweries"],
    }),
    updatedBrewery: builder.mutation({
      query: (data) => ({
        url: `${BREWERY_URL}/${data.breweryId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Breweries"],
    }),
    deleteBrewery: builder.mutation({
      query: (breweryId) => ({
        url: `${BREWERY_URL}/${breweryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Breweries"],
    }),
  }),
});

export const {
  useGetBreweriesQuery,
  useGetBreweryQuery,
  useCreateBreweryMutation,
  useUpdatedBreweryMutation,
  useDeleteBreweryMutation,
} = breweryApiSlice;
