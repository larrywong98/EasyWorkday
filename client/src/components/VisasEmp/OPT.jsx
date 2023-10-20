import React from "react";
import HRFeedback from "./HRFeedback";
import { nextSteps } from "../../reducer/global";
import UploadForm from "../VisaForms/UploadForm";
const OPT = ({ status }) => {
  const OPTReceipt = () => {
    if (status === "pending") {
      return <p>{nextSteps.opt[0]}</p>;
    } else if (status === "approved") {
      return <p>{nextSteps.opt[1]}</p>;
    } else if (status === "rejected") {
      return <HRFeedback />;
    }
  };
  const approve = (st) => st === "approved";
  const receipt = OPTReceipt();
  return (
    <div>
      <div>
        {receipt} {!approve(status) && <UploadForm name="Opt" />}
      </div>
    </div>
  );
};

export default OPT;
