import React from "react";
import HRFeedback from "./HRFeedback";

const OPT = ({ status }) => {
  const OPTReceipt = () => {
    if (status === "pending") {
      return <p>Waiting for HR to approve your OPT Receipt</p>;
    } else if (status === "approved") {
      return <p>Please upload a copy of your OPT EAD</p>;
    } else if (status === "rejected") {
      return <HRFeedback />;
    }
  };
  const receipt = OPTReceipt();
  return <div>{receipt}</div>;
};

export default OPT;
