import { ACHIEVEMENTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const breweryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAchievements: builder.query({
      query: () => ({
        url: ACHIEVEMENTS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Achievements"],
    }),
    // ADMIN - Adding beer to brewery
    addAchievement: builder.mutation({
      query: (data) => ({
        url: `${ACHIEVEMENTS_URL}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Achievements"],
    }),
  }),
});

export const { useGetAchievementsQuery, useAddAchievementMutation } =
  breweryApiSlice;
