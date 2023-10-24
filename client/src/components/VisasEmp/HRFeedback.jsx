import React from "react";
// feedback from hr

const HRFeedback = ({ feedback }) => {
  const HRFeedback = feedback.length ? feedback : "Rejected without feedback";
  return <p>{HRFeedback}</p>;
};

export default HRFeedback;
