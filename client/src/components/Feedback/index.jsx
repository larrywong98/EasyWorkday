import { Form } from "antd";
import { useSelector } from "react-redux";
import { status } from "../../reducer/global";
import { Input } from "antd";
const { TextArea } = Input;
const Feedback = (props) => {
  const user = useSelector((state) => state.userReducer);
  const pageFeedback = () => {
    if (props.feedback === "onboard") {
      return user.onboardFeedback;
    } else if (props.feedback === "optReceipt") {
      return user.visa.optReceiptFeedback;
    } else if (props.feedback === "optEad") {
    } else if (props.feedback === "i983") {
    } else if (props.feedback === "i20") {
    }
  };
  return (
    <>
      {user.applicationStatus === status.rejected ? (
        <Form.Item label="Reject Reason">
          <TextArea
            rows={4}
            value={pageFeedback()}
            style={{ color: "#ef5350" }}
            disabled
          />
        </Form.Item>
      ) : (
        <></>
      )}
    </>
  );
};
export default Feedback;
