// store.ts
import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./features/toastSlice";
import confirmationReducer from "./features/confirmation/confirmationSlice";
import { apiSlice } from "../redux/api/apiSlice"; // <-- import the apiSlice

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // <-- add the API reducer
    confirmation: confirmationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // <-- add the API middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
