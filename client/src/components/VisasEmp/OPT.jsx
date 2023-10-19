import React from "react";
import HRFeedback from "./HRFeedback";
import { NextSteps } from "../../reducer/global";

const OPT = ({ status }) => {
  const OPTReceipt = () => {
    if (status === "pending") {
      return <p>{NextSteps.opt[0]}</p>;
    } else if (status === "approved") {
      return <p>{NextSteps.opt[1]}</p>;
    } else if (status === "rejected") {
      return <HRFeedback />;
    }
  };
  const receipt = OPTReceipt();
  return <div>{receipt}</div>;
};

export default OPT;
