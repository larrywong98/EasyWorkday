import React from "react";
import HRFeedback from "./HRFeedback";
import UploadForm from "../VisaForms/UploadForm";
import { NextSteps } from "../../reducer/global";

const EAD = ({ status }) => {
  const EADReceipt = () => {
    if (status === "pending") {
      return <p>{NextSteps.ead[0]}</p>;
    } else if (status === "approved") {
      return <p>{NextSteps.ead[1]}</p>;
    } else if (status === "rejected") {
      return <HRFeedback />;
    }
  };
  const approve = (st) => st === "approved";
  const receipt = EADReceipt();
  return (
    <div>
      {receipt} {!approve(status) && <UploadForm />}
    </div>
  );
};

export default EAD;
