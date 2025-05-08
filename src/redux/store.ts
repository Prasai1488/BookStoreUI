import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./features/toastSlice";
// import other reducers...

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    // other reducers...
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
