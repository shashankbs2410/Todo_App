import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    signedIn: false,
    userInfo: {
      name: "",
      email: "",
    },
  },
  reducers: {
    toggeSignIn(state) {
      state.signedIn = !state.signedIn;
    },
    setUserinfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
