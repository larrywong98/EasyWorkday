import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statusArray: ["approved", "approved", "approved", "approved"],
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    addInitialStatus: (state, action) => {
      const { status } = action.payload;
      const lastStatus = state.statusArray[state.statusArray.length - 1];
      if (lastStatus === "approved") {
        state.statusArray.push(status);
      }
    },
    // setStatusToPending, Rejected, Approved
    setStatus: (state, action) => {
      const { status } = action.payload;
      state.statusArray.push(status);
    },
  },
});

export const { addInitialStatus, setStatus } = statusSlice.actions;

export default statusSlice.reducer;
