import React from "react";
import HRFeedback from "./HRFeedback";
import { nextSteps } from "../../reducer/global";
import UploadForm from "../VisaForms/UploadForm";
import DownloadForm from "../VisaForms/DownloadForm";
import { temps } from "../../reducer/global";
import { Space } from "antd";

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
    <>
      {!approve(status) && (
        <Space wrap>
          <DownloadForm url={temps[0]} text="form" />
          <DownloadForm url={temps[1]} text="template" />
        </Space>
      )}
      <div>
        {receipt} {!approve(status) && <UploadForm name="Opt" />}
      </div>
    </>
  );
};

export default OPT;
