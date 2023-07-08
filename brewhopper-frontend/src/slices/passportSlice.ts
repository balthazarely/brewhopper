import { BEER_REVIEW_URL, PASSPORT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const passportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: `${PASSPORT_URL}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Passport"],
    }),
    getUserReviews: builder.query({
      query: () => ({
        url: `${BEER_REVIEW_URL}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Passport"],
    }),
    updateUserReview: builder.mutation({
      query: (body) => ({
        url: `${BEER_REVIEW_URL}/${body._id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Passport"],
    }),
    deleteUserReviews: builder.mutation({
      query: (body) => ({
        url: `${BEER_REVIEW_URL}/${body._id}`,
        method: "DELETE",
        body: { beerId: body.beerId },
      }),
      invalidatesTags: ["Passport"],
    }),
    addPassportBrewery: builder.mutation({
      query: (body) => ({
        url: `${PASSPORT_URL}/add-beer`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Passport"],
    }),
    deletePassportBrewery: builder.mutation({
      query: (id) => ({
        url: `${PASSPORT_URL}/add-beer`,
        method: "DELETE",
        body: { _id: id },
      }),
      invalidatesTags: ["Passport"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetUserReviewsQuery,
  useUpdateUserReviewMutation,
  useDeleteUserReviewsMutation,
  useAddPassportBreweryMutation,
  useDeletePassportBreweryMutation,
} = passportApiSlice;
