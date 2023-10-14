import React from "react";
import { useSelector } from "react-redux";
// feedback from hr

const HRFeedback = () => {
  const feedback = useSelector((state) => state.feedbackReducer.feedback);
  const HRFeedback = feedback.length ? feedback : "Rejected without feedback";
  return <p>{HRFeedback}</p>;
};

export default HRFeedback;
