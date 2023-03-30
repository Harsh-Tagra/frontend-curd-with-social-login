import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const Profile = createSlice({
  name: "data",
  initialState,
  reducers: {
    SetProfile: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetProfile } = Profile.actions;

export default Profile.reducer;
