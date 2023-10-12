import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import {
  updateApplicationStatus,
  updateOnboardFeedback,
} from "../../reducer/userSlice";
import { status } from "../../reducer/global";
import { useState } from "react";

const OnBoardingHr = () => {
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState("");

  const approve = () => {
    dispatch(updateOnboardFeedback({ onboardFeedback: "" }));
    dispatch(updateApplicationStatus({ applicationStatus: status.approved }));
  };
  const reject = () => {
    dispatch(updateOnboardFeedback({ onboardFeedback: feedback }));
    dispatch(updateApplicationStatus({ applicationStatus: status.rejected }));
  };

  return (
    <>
      <Input value={feedback} onChange={(e) => setFeedback(e.target.value)} />
      <Button type="primary" onClick={() => approve()}>
        Approve
      </Button>
      <Button type="primary" onClick={() => reject()} danger>
        Reject
      </Button>
    </>
  );
};
export default OnBoardingHr;
