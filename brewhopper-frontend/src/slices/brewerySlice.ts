import { BREWERY_URL, UPLOAD_URL } from "../constants";
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
    getBeersAtBrewery: builder.query({
      query: (breweryId) => ({
        url: `${BREWERY_URL}/${breweryId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Breweries", "Beers"],
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
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    uploadProductImageCloudinary: builder.mutation({
      query: (data) => ({
        url: `/api/upload-cloud`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBreweriesQuery,
  useGetBeersAtBreweryQuery,
  useGetBreweryQuery,
  useCreateBreweryMutation,
  useUpdatedBreweryMutation,
  useDeleteBreweryMutation,
  useUploadProductImageMutation,
  useUploadProductImageCloudinaryMutation,
} = breweryApiSlice;
