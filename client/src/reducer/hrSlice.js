import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const hrSlice = createSlice({
  name: "hr",
  initialState,
  reducers: {
    load: (state) => {
      return state;
    },
  },
});

export const { load } = hrSlice.actions;
export default hrSlice.reducer;
