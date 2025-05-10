import { apiSlice } from "../../api/apiSlice";
import type { BookResponseDto } from "../../../types/bookTypes";
import type { Announcement } from "../../../types/announcementTypes";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 📚 Book Management Endpoints
    getAllAdminBooks: builder.query<BookResponseDto[], void>({
      query: () => "/admin/books",
      providesTags: ["AdminBooks"],
    }),

    createBook: builder.mutation<any, Partial<BookResponseDto>>({
      query: (body) => ({
        url: "/admin/books",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminBooks"],
    }),

    updateBook: builder.mutation<
      any,
      { id: number; data: Partial<BookResponseDto> }
    >({
      query: ({ id, data }) => ({
        url: `/admin/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AdminBooks"],
    }),

    deleteBook: builder.mutation<any, number>({
      query: (id) => ({
        url: `/admin/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminBooks"],
    }),

    // 📢 Announcement Management Endpoints
    getAnnouncements: builder.query<Announcement[], void>({
      query: () => "admin/announcements",
      providesTags: ["Announcement"],
    }),

    createAnnouncement: builder.mutation<any, Partial<Announcement>>({
      query: (data) => ({
        url: "admin/announcements",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Announcement"],
    }),

    updateAnnouncement: builder.mutation<
      any,
      { id: number; data: Partial<Announcement> }
    >({
      query: ({ id, data }) => ({
        url: `admin/announcements/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Announcement"],
    }),

    deleteAnnouncement: builder.mutation<any, number>({
      query: (id) => ({
        url: `admin/announcements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Announcement"],
    }),
  }),
});

export const {
  // Books
  useGetAllAdminBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,

  // Announcements
  useGetAnnouncementsQuery,
  useCreateAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = adminApi;
