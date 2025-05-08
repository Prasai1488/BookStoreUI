// src/redux/features/books/booksApi.ts
import { apiSlice } from "../../api/apiSlice"; // ✅ Adjust this path if needed
import type { BookResponseDto } from "../../../types/bookTypes"; // ✅ Optional: define or adjust based on your DTO

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
};

export const booksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBooks: builder.query<FetchBooksResponse, FetchBooksParams>({
      query: (params) => {
        const searchParams = new URLSearchParams(params as any).toString();
        return `/public/books?${searchParams}`;
      },
    }),
    // ✅ Book by ID
    fetchBookById: builder.query<BookResponseDto, string | number>({
      query: (id) => `public/books/${id}`,
    }),
  }),
});

export const { useFetchBooksQuery,useFetchBookByIdQuery } = booksApi;
