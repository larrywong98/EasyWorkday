import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feedback: "",
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setVisaFeedback: (state, action) => {
      const { visaFeedback } = action.payload;
      state.feedback = visaFeedback;
    },
    clearVisaFeedback: (state, action) => {
      state.feedback = "";
    },
  },
});

export const { setVisaFeedback, clearVisaFeedback } = feedbackSlice.actions;

export default feedbackSlice.reducer;
