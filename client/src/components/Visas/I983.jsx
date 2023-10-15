import React from "react";
import HRFeedback from "./HRFeedback";
import DownloadForm from "../VisaForms/DownloadForm";
import UploadForm from "../VisaForms/UploadForm";

const I983 = ({ status }) => {
  const I983Receipt = () => {
    if (status === "pending") {
      return <p>Waiting for HR to approve your and sign your I-983</p>;
    } else if (status === "approved") {
      return (
        <p>
          Please send the I-983 along with all necesseay documents to your
          school and upload the new I-20
        </p>
      );
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
