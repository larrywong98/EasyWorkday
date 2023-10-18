import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // statusArray: ["pending"],
  arr: ["pending", "initial", "initial", "initial"],
  cur: 0,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    statusTrigger: (state, action) => {
      if (state.cur >= 4) {
        return;
      }
      const { status } = action.payload;
      state.arr[state.cur] = status;
      if (status === "approved") {
        state.cur++;
      }
    },
  },
});

export const { statusTrigger } = statusSlice.actions;

export default statusSlice.reducer;
