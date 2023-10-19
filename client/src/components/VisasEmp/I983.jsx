import React from "react";
import HRFeedback from "./HRFeedback";
import DownloadForm from "../VisaForms/DownloadForm";
import UploadForm from "../VisaForms/UploadForm";
import { NextSteps } from "../../reducer/global";

const I983 = ({ status }) => {
  const I983Receipt = () => {
    if (status === "pending") {
      return <p>{NextSteps.i983[0]}</p>;
    } else if (status === "approved") {
      return <p>{NextSteps.i983[1]}</p>;
    } else if (status === "rejected") {
      return <HRFeedback />;
    }
  };
  const approve = (st) => st === "approved";
  const receipt = I983Receipt();
  return (
    <div>
      {receipt} {!approve(status) && <DownloadForm />}
      {!approve(status) && <UploadForm />}
    </div>
  );
};

export default I983;
