// src/redux/features/books/booksApi.ts
import { apiSlice } from "../../api/apiSlice";
import type { BookResponseDto } from "../../../types/bookTypes";

type FetchBooksParams = {
  search?: string;
  genre?: string;
  format?: string;
  onSale?: boolean;
  sortBy?: string;
  order?: string;
  page?: number;
  pageSize?: number;
  isExclusive?: boolean;
};

type FetchBooksResponse = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  books: BookResponseDto[];
  bestSellers: BookResponseDto[];
};

export const booksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBooks: builder.query<FetchBooksResponse, FetchBooksParams>({
      query: (params) => {
        const searchParams = new URLSearchParams(params as any).toString();
        return `/public/books?${searchParams}`;
      },
    }),

    fetchBookById: builder.query<BookResponseDto, string | number>({
      query: (id) => `public/books/${id}`,
    }),

    getBookReviews: builder.query({
      query: (bookId) => `/public/books/${bookId}/reviews`,
      providesTags: ( bookId) => [
        { type: "Reviews", id: bookId },
      ],
    }),

    addBookmark: builder.mutation<any, number>({
      query: (bookId) => ({
        url: `/member/bookmarks/${bookId}`,
        method: "POST",
      }),
      invalidatesTags: ["Bookmarks"],
    }),

    removeBookmark: builder.mutation<any, number>({
      query: (bookId) => ({
        url: `/member/bookmarks/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookmarks"],
    }),

    getBookmarks: builder.query<BookResponseDto[], void>({
      query: () => "/member/bookmarks",
      providesTags: ["Bookmarks"],
    }),
    getBestSellingBooks: builder.query<
      FetchBooksResponse,
      { page?: number; pageSize?: number }
    >({
      query: ({ page = 1, pageSize = 10 } = {}) =>
        `/public/books/bestsellers?page=${page}&pageSize=${pageSize}`,
    }),
  }),
});

export const {
  useFetchBooksQuery,
  useFetchBookByIdQuery,
  useGetBookReviewsQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
  useGetBookmarksQuery,
  useGetBestSellingBooksQuery,
} = booksApi;
