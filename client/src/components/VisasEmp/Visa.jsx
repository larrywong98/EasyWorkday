import React from "react";
import HRFeedback from "./HRFeedback";
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

const Visa = ({ name, index }) => {
  console.log(`name: ${name}, index: ${index}`);
  const isI983 = (name) => name === "I983";
  const visaInfo = useSelector((state) => state.userReducer.visa);
  const status = visaInfo[statusProperties[index]];
  console.log(status);
  const Receipt = () => {
    if (status === "pending") {
      return <p>{nextSteps[visas[index][0]]}</p>;
    } else if (status === "approved") {
      if (visaInfo[statusProperties[index]] === "approved") {
        return <p></p>;
      }
      return <p>{nextSteps[visas[index][1]]}</p>;
    } else if (status === "rejected") {
      return <HRFeedback feedback={visaInfo[receiptProperties[index]]} />;
    }
  };
  const approve = (st) => st === "approved";
  const receipt = Receipt();
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
