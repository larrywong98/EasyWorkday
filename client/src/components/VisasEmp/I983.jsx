import React from "react";
import HRFeedback from "./HRFeedback";
import DownloadForm from "../VisaForms/DownloadForm";
import UploadForm from "../VisaForms/UploadForm";
import { nextSteps } from "../../reducer/global";
import { temps } from "../../reducer/global";

const I983 = ({ status }) => {
  const I983Receipt = () => {
    if (status === "pending") {
      return <p>{nextSteps.i983[0]}</p>;
    } else if (status === "approved") {
      return <p>{nextSteps.i983[1]}</p>;
    } else if (status === "rejected") {
      return <HRFeedback />;
    }
  };
  const approve = (st) => st === "approved";
  const receipt = I983Receipt();
  return (
    <div>
      {receipt}{" "}
      {!approve(status) && <DownloadForm url={temps[1]} text="form" /> && (
        <DownloadForm url={temps[2]} text="template" />
      )}
      {!approve(status) && <UploadForm />}
    </div>
  );
};

export default I983;
