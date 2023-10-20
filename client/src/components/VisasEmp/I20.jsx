import React from "react";
import HRFeedback from "./HRFeedback";
import UploadForm from "../VisaForms/UploadForm";
import { nextSteps } from "../../reducer/global";

const I20 = ({ status }) => {
  const I20Receipt = () => {
    if (status === "pending") {
      return <p>{nextSteps.i20[0]}</p>;
    } else if (status === "approved") {
      return <p>{nextSteps.i20[1]}</p>;
    } else if (status === "rejected") {
      return <HRFeedback />;
    }
  };
  const approve = (st) => st === "approved";
  const receipt = I20Receipt();
  return (
    <section>
      {receipt}
      {!approve(status) && <UploadForm />}
    </section>
  );
};

export default I20;
