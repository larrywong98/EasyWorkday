import { Button, Input, Space } from "antd";
import { useEffect, useState } from "react";
import sendRequest from "../../services/sendRequest";
import { statusProperties, receiptProperties } from "../../reducer/global";
const { TextArea } = Input;

const Action = ({ employeeId, curIdx }) => {
  const [feedback, setFeedback] = useState("");
  const [visaName, setVisaName] = useState("");
  const [receiptName, setReceiptName] = useState("");
  console.log(`Action: ${curIdx}`);
  useEffect(() => {
    setVisaName(statusProperties[curIdx]);
    setReceiptName(receiptProperties[curIdx]);
  }, [curIdx]);

  const updateDecision = async (status, feedback) => {
    console.log(`visa: ${visaName},
    status: ${status},
    receipt: ${receiptName},
    feedback: ${feedback},`);
    const response = await sendRequest({
      url: "http://127.0.0.1:4000/api/emp/visastatus/" + employeeId,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        visa: visaName,
        status: status,
        receipt: receiptName,
        feedback: feedback,
      }),
    });

    console.log(response);
    setFeedback("");
  };
  // const approve = () => {
  //   dispatch(setVisa({ status: "approved", index: curIdx }));
  //   dispatch(setReceipt({ receipt: "Approved", index: curIdx }));
  //   dispatch(clearVisaFeedback());
  //   setFeedback("");
  // };
  // const reject = () => {
  //   dispatch(setVisa({ status: "rejected", index: curIdx }));
  //   dispatch(setVisaFeedback({ visaFeedback: feedback }));
  //   dispatch(setReceipt({ receipt: feedback, index: curIdx }));
  //   setFeedback("");
  // };
  return (
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
  );
};
export default Action;
