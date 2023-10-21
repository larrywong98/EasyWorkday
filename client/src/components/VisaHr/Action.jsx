import { Button, Card, Input, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  setVisaFeedback,
  clearVisaFeedback,
} from "../../reducer/feedbackSlice";

import { setVisa, setReceipt, updateVisaStatus } from "../../reducer/userSlice";

const { TextArea } = Input;

const Action = () => {
  const dispatch = useDispatch();
  const curIdx = useSelector((state) => state.userReducer.visa.cur);
  const [feedback, setFeedback] = useState("");
  console.log(curIdx);
  const approve = () => {
    dispatch(setVisa({ status: "approved", index: curIdx }));
    dispatch(setReceipt({ receipt: "Approved", index: curIdx }));
    dispatch(clearVisaFeedback());
    setFeedback("");

    if (curIdx === 4) {
      dispatch(updateVisaStatus({ visaStatus: "4" }));
    }
  };
  const reject = () => {
    dispatch(setVisa({ status: "rejected", index: curIdx }));
    dispatch(setVisaFeedback({ visaFeedback: feedback }));
    dispatch(setReceipt({ receipt: feedback, index: curIdx }));
    setFeedback("");
  };
  return (
    <>
      <Card style={{ display: "flex", justifyContent: "center" }}>
        <Space>
          <TextArea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <Button type="primary" onClick={() => approve()}>
            Approve
          </Button>
          <Button type="primary" onClick={() => reject()} danger>
            Reject
          </Button>
        </Space>
      </Card>
    </>
  );
};
export default Action;
