// src/redux/api/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bookstoreapi-ym8m.onrender.com", //  secure backend render base URL
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const token = user?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Bookmarks",
    "Cart",
    "Orders",
    "Reviews",
    "AdminBooks",
    "Announcement",
  ],

  endpoints: () => ({}),
});

// Local host URL : "https://localhost:7044"
