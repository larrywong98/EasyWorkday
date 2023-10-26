import React from "react";
import {
  nextSteps,
  visas,
  receiptProperties,
  statusProperties,
} from "../../reducer/global";
import UploadForm from "../VisaForms/UploadForm";
import DownloadForm from "../VisaForms/DownloadForm";
import { useSelector } from "react-redux";
import { temps } from "../../reducer/global";
import { Space } from "antd";
import { approve } from "../../utils/approve";

const Visa = ({ name, index }) => {
  const isI983 = (name) => name === "I983";
  const visaInfo = useSelector((state) => state.userReducer.visa);
  const status = visaInfo[statusProperties[index]];
  const Receipt = (index) => {
    if (status === "pending") {
      return <p>{nextSteps[visas[index]][0]}</p>;
    } else if (status === "approved") {
      if (visaInfo[statusProperties[Math.min(index + 1, 6)]] === "approved") {
        return <p></p>;
      }
      return <p>{nextSteps[visas[index]][1]}</p>;
    } else if (status === "rejected") {
      const feedback =
        visaInfo[receiptProperties[index]] || "Rejected without feedback";
      // const HRFeedback = feedback.length
      //   ? feedback
      //   : "Rejected without feedback";
      return <p style={{ color: "red" }}>Reject reason: {feedback}</p>;
    }
  };

  const receipt = Receipt(index);

  return (
    <>
      <div>
        {receipt}
        {!approve(status) && isI983(name) && (
          <Space wrap>
            <DownloadForm url={temps[0]} text="form" />
            <DownloadForm url={temps[1]} text="template" />
          </Space>
        )}
        <div>{!approve(status) && <UploadForm name={name} />}</div>
      </div>
    </>
  );
};

export default Visa;
