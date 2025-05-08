import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  type: "success" | "error" | "info";
  message: string;
  visible: boolean;
}

const initialState: ToastState = {
  type: "info",
  message: "",
  visible: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{ type: ToastState["type"]; message: string }>
    ) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.visible = true;
    },
    hideToast: (state) => {
      state.visible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
