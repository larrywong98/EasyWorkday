import { Breadcrumb } from "antd";
import { Button, Card, Input, Space } from "antd";
import { useDispatch } from "react-redux";
import { useState } from "react";
// import { changeStatus } from "../../reducer/statusSlice";
import { statusTrigger } from "../../reducer/statusSlice";
import {
  setVisaFeedback,
  clearVisaFeedback,
} from "../../reducer/feedbackSlice";

const { TextArea } = Input;

const VisaHr = () => {
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState("");
  const approve = () => {
    // dispatch(changeStatus({ status: "approved" }));
    dispatch(statusTrigger({ status: "approved" }));
    dispatch(clearVisaFeedback());
    setFeedback("");
  };
  const reject = () => {
    // dispatch(changeStatus({ status: "rejected" }));
    dispatch(statusTrigger({ status: "rejected" }));
    dispatch(setVisaFeedback({ visaFeedback: feedback }));
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
        visa hr
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
    </>
  );
};
export default VisaHr;
