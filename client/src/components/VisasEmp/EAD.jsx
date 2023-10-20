import React from "react";
import HRFeedback from "./HRFeedback";
import UploadForm from "../VisaForms/UploadForm";
import { nextSteps } from "../../reducer/global";

const EAD = ({ status }) => {
  const EADReceipt = () => {
    if (status === "pending") {
      return <p>{nextSteps.ead[0]}</p>;
    } else if (status === "approved") {
      return <p>{nextSteps.ead[1]}</p>;
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
