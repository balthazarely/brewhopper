import { BREWERY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const breweryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBreweries: builder.query({
      query: () => ({
        url: BREWERY_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getBrewery: builder.query({
      query: (breweryId) => ({
        url: `${BREWERY_URL}/${breweryId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetBreweriesQuery, useGetBreweryQuery } = breweryApiSlice;
