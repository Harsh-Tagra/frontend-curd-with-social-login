import { configureStore } from "@reduxjs/toolkit";
import FormDialogState from "./FormDialogState";
import Profile from "./Profile";
export const store = configureStore({
  reducer: {
    FormDialogState,
    Profile,
  },
});
