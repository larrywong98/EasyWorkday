import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    role: "emp",
  },
  reducers: {
    loadUser: (state) => {
      return state;
    },
  },
});

export const { loadUser } = userSlice.actions;
export default userSlice.reducer;
