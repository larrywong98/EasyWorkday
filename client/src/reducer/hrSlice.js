import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  response: [],
  empStatus: [],
  time: [],
  curIndex: [],
  latestVisaUrl: [],
  nextStep: [],
};

const hrSlice = createSlice({
  name: "hrInfo",
  initialState,
  reducers: {
    initialHrSlice: (state, action) => {
      const { status, index, url, message } = action.payload;
      state.empStatus.push(status);
      state.response.push(false);
      state.curIndex.push(index);
      state.latestVisaUrl.push(url);
      state.nextStep.push(message);
      if (state.time.length === 0) {
        state.time.push("");
      }
    },
    changeResponse: (state, action) => {
      const index = action.payload;
      state.response.splice(index, 1, true);
    },
    updateTime: (state, action) => {
      const index = action.payload;
      state.time.splice(index, 1, moment().calendar());
    },
    clearHrSlice: (state) => {
      state.empStatus.length = 0;
      state.response.length = 0;
      // state.time.length = 0;
      state.curIndex.length = 0;
      state.latestVisaUrl.length = 0;
      state.nextStep.length = 0;
    },
  },
});

export const { initialHrSlice, changeResponse, updateTime, clearHrSlice } =
  hrSlice.actions;
export default hrSlice.reducer;
