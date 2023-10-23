import { Button, Input, Space } from "antd";
import { useEffect, useState } from "react";
import sendRequest from "../../services/sendRequest";
import {
  statusProperties,
  receiptProperties,
  visas,
} from "../../reducer/global";
import DownloadForm from "../../components/VisaForms/DownloadForm";
import { changeResponse, updateTime } from "../../reducer/hrSlice";
import { useDispatch, useSelector } from "react-redux";
const { TextArea } = Input;

const Action = ({ index, employeeId }) => {
  const curIdx = useSelector((state) => state.hrReducer.curIndex[index]);
  const visaUrl = useSelector((state) => state.hrReducer.latestVisaUrl[index]);
  const dispatch = useDispatch();
  const [visaName, setVisaName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [visaStatusName, setVisaStatusName] = useState("");
  const [receiptName, setReceiptName] = useState("");
  // console.log(`Action: ${curIdx}`);
  useEffect(() => {
    setVisaName(visas[curIdx]);
    setVisaStatusName(statusProperties[curIdx]);
    setReceiptName(receiptProperties[curIdx]);
  }, [curIdx]);

  const approve = (st) => st === "approved";
  const updateDecision = async (status, feedback) => {
    console.log(`visa: ${visaStatusName},
    status: ${status},
    receipt: ${receiptName},
    feedback: ${feedback},`);
    const updateIdx = approve(status) ? curIdx + 1 : curIdx;
    const response = await sendRequest({
      url: "http://127.0.0.1:4000/api/emp/visastatus/" + employeeId,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        updateIdx: updateIdx,
        visa: visaStatusName,
        status: status,
        receipt: receiptName,
        feedback: feedback,
      }),
    });

    console.log(response);
    setFeedback("");
    dispatch(changeResponse(index));
    dispatch(updateTime(index));
  };
  return (
    <>
      <Space direction="vertical">
        <DownloadForm url={visaUrl} text={visaName} />
        <Space wrap>
          <TextArea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <Button
            type="primary"
            onClick={() => updateDecision("approved", feedback)}
          >
            Approve
          </Button>
          <Button
            type="primary"
            onClick={() => updateDecision("rejected", feedback)}
            danger
          >
            Reject
          </Button>
        </Space>
      </Space>
    </>
  );
};
export default Action;
