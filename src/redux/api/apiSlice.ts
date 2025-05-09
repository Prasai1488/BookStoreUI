// src/redux/api/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7044", // ✅ your secure backend base URL
    prepareHeaders: (headers, { getState }) => {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const token = user?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Bookmarks", "Cart"],

  endpoints: () => ({}),
});
