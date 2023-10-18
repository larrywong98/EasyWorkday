import { Breadcrumb } from "antd";
import { Button, Card, Input, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { statusTrigger } from "../../reducer/statusSlice";
import {
  setVisaFeedback,
  clearVisaFeedback,
} from "../../reducer/feedbackSlice";

import { setVisa, setReceipt, updateVisaStatus } from "../../reducer/userSlice";

const { TextArea } = Input;

const VisaHr = () => {
  const dispatch = useDispatch();
  const curIdx = useSelector((state) => state.statusReducer.cur);
  const [feedback, setFeedback] = useState("");
  const approve = () => {
    // dispatch(changeStatus({ status: "approved" }));
    dispatch(statusTrigger({ status: "approved" }));
    dispatch(setVisa({ status: "approved", index: curIdx }));
    dispatch(setReceipt({ receipt: "approved", index: curIdx }));
    dispatch(clearVisaFeedback());
    setFeedback("");

    if (curIdx === 4) {
      dispatch(updateVisaStatus({ visaStatus: "4" }));
    }
  };
  const reject = () => {
    // dispatch(changeStatus({ status: "rejected" }));
    dispatch(statusTrigger({ status: "rejected" }));
    dispatch(setVisa({ status: "rejected", index: curIdx }));
    dispatch(setVisaFeedback({ visaFeedback: feedback }));
    dispatch(setReceipt({ receipt: feedback, index: curIdx }));
    setFeedback("");
  };
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
      ></Breadcrumb>
      <div
        className="site-layout-content"
        style={{
          height: "800px",
        }}
      >
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
      </div>
      {/* <Outlet /> */}
    </>
  );
};
export default VisaHr;
