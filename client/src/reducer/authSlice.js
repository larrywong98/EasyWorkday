import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  userName: "",
  role: "",
  signedIn: "",
  regToken: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {
    loadUserStatus: (state, action) => {
      // state = {
      //   userId: "",
      //   userName: "",
      //   role: "",
      //   signedIn: "",
      // };
      state = action.payload.userLogin;
      return state;
    },
  },
});
export const { loadUserStatus } = authSlice.actions;
export default authSlice.reducer;
