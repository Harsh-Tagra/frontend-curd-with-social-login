import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Open: false,
  type: "",
};

export const FormDialogState = createSlice({
  name: "Online",
  initialState,
  reducers: {
    SetFormDialogState: (state, action) => {
      state.Open = action.payload.Open;
      state.type = action.payload.type;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetFormDialogState } = FormDialogState.actions;

export default FormDialogState.reducer;
