import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: false,
};

const hrSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
    setResponse: (state) => {
      state.response = true;
    },
  },
});

export const { setResponse } = hrSlice.actions;
export default hrSlice;
