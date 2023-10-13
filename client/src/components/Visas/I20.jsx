import React from "react";
import HRFeedback from "./HRFeedback";

const I20 = ({ status }) => {
  const I20Receipt = () => {
    if (status === "pending") {
      return <p>Waiting for HR to approve your I-20</p>;
    } else if (status === "approved") {
      return <p>All documents have been approved</p>;
    } else if (status === "rejected") {
      return <HRFeedback />;
    }
  };
  const receipt = I20Receipt();
  return <section>I20Receipt: {receipt}</section>;
};

export default I20;
