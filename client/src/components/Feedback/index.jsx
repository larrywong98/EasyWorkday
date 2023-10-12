import { Form } from "antd";
import { useSelector } from "react-redux";
import { status } from "../../reducer/global";
import { Input } from "antd";
const { TextArea } = Input;
const Feedback = () => {
  const user = useSelector((state) => state.userReducer);
  return (
    <>
      {user.applicationStatus === status.rejected ? (
        <Form.Item label="Reject Reason">
          <TextArea
            rows={4}
            value={user.onboardFeedback}
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
