import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  userName: "",
  email: "",
  role: "",
  signedIn: false,
  regToken: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.signedIn = true;
      return state;
    },
    signOut: (state) => {
      state.signedIn = false;
      return state;
    },
  },
});
export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
