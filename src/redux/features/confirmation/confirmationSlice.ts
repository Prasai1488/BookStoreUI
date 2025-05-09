// src/redux/features/confirmation/confirmationSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ConfirmationState {
  isOpen: boolean;
  message: string;
}

const initialState: ConfirmationState = {
  isOpen: false,
  message: "",
//   onConfirm: null,
};

const confirmationSlice = createSlice({
  name: "confirmation",
  initialState,
  reducers: {
    showConfirmation: (state, action: PayloadAction<{ message: string }>) => {
      state.isOpen = true;
      state.message = action.payload.message;
    },
    hideConfirmation: (state) => {
      state.isOpen = false;
      state.message = "";
    },
  },
});

export const { showConfirmation, hideConfirmation } = confirmationSlice.actions;
export default confirmationSlice.reducer;
