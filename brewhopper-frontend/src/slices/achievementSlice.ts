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
        url: `${ACHIEVEMENTS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Achievements"],
    }),
    updateAchievement: builder.mutation({
      query: (data) => ({
        url: `${ACHIEVEMENTS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Achievements"],
    }),
    deleteAchievement: builder.mutation({
      query: (achievementId) => ({
        url: `${ACHIEVEMENTS_URL}/${achievementId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Achievements"],
    }),
    getUserCoupons: builder.query({
      query: () => ({
        url: `${ACHIEVEMENTS_URL}/coupon`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Achievements"],
    }),
    getCouponById: builder.query({
      query: (couponId) => ({
        url: `${ACHIEVEMENTS_URL}/coupon/${couponId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Achievements"],
    }),
    createCoupon: builder.mutation({
      query: (data) => ({
        url: `${ACHIEVEMENTS_URL}/coupon`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Achievements"],
    }),
    redeemCoupon: builder.mutation({
      query: (couponId) => ({
        url: `${ACHIEVEMENTS_URL}/coupon/${couponId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Achievements"],
    }),
  }),
});

export const {
  useGetAchievementsQuery,
  useAddAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
  useGetUserCouponsQuery,
  useCreateCouponMutation,
  useGetCouponByIdQuery,
  useRedeemCouponMutation,
} = breweryApiSlice;
