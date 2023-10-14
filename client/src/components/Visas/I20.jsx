import React from "react";
import HRFeedback from "./HRFeedback";
import UploadForm from "../VisaForms/UploadForm";

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
