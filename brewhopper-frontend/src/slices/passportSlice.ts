import { PASSPORT_URL } from "../constants";
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
  useAddPassportBreweryMutation,
  useDeletePassportBreweryMutation,
} = passportApiSlice;
