import React from "react";
import HRFeedback from "./HRFeedback";
import UploadForm from "../VisaForms/UploadForm";

const EAD = ({ status }) => {
  const EADReceipt = () => {
    if (status === "pending") {
      return <p>Waiting for HR to approve your OPT EAD</p>;
    } else if (status === "approved") {
      return <p>Please download and fill out the I-983 form</p>;
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
