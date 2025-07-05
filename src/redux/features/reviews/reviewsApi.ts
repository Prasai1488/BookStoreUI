import { apiSlice } from "../../api/apiSlice";

// types
type CreateReviewDto = {
  bookId: number;
  rating: number;
  comment: string;
};

type MyReview = {
  id: number;
  bookId: number;
  bookTitle: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    leaveReview: builder.mutation<string, CreateReviewDto>({
      query: (body) => ({
        url: "/member/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, arg) => [{ type: "Reviews", id: arg.bookId }],
    }),

    getMyReviews: builder.query<MyReview[], void>({
      query: () => "/member/reviews",
      providesTags: ["Reviews"],
    }),
  }),
});

export const { useLeaveReviewMutation, useGetMyReviewsQuery } = reviewsApi;
