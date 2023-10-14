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
      const { status } = action.payload;
      state.arr[state.cur] = status;
      if (status === "approved") {
        state.cur++;
      }
    },
    // // addInitialStatus to pending
    // setPendingStatus: (state, action) => {
    //   const { status } = action.payload;
    //   const lastStatus = state.statusArray[state.statusArray.length - 1];
    //   if (lastStatus === "approved") {
    //     // previous status
    //     state.statusArray.push(status);
    //   } else if (lastStatus === "rejected") {
    //     // current status
    //     state.statusArray.pop();
    //     state.statusArray.push(status);
    //   } else {
    //     return;
    //   }
    // },
    // // setStatusTo Rejected, Approved
    // changeStatus: (state, action) => {
    //   const { status } = action.payload;
    //   state.statusArray.pop();
    //   state.statusArray.push(status);
    // },
  },
});

// export const { setPendingStatus, changeStatus } = statusSlice.actions;

export const { statusTrigger } = statusSlice.actions;

export default statusSlice.reducer;
