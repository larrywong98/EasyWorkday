import { Button, Card, Form, Input, Space, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import {
  setVisa,
  updateApplicationStatus,
  updateOnboardFeedback,
} from "../../reducer/userSlice";
import { status } from "../../reducer/global";
import { useState } from "react";
import validator from "validator";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import emailjs from "@emailjs/browser";
import { statusTrigger } from "../../reducer/statusSlice";
const { TextArea } = Input;

const OnBoardingHr = () => {
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [token, setToken] = useState("");

  const approve = () => {
    dispatch(updateOnboardFeedback({ onboardFeedback: "" }));
    dispatch(updateApplicationStatus({ applicationStatus: status.approved }));
    dispatch(setVisa({ status: "pending", index: 0 }));
    dispatch(statusTrigger({ status: "pending" }));
  };
  const reject = () => {
    dispatch(updateOnboardFeedback({ onboardFeedback: feedback }));
    dispatch(updateApplicationStatus({ applicationStatus: status.rejected }));
  };
  const onChange = (e) => {
    setEmployeeEmail(e.target.value);
    if (checkEmail(e.target.value) === "error") {
      setEmailError("error");
      return;
    }
    setEmailError("noError");
  };
  const generateToken = () => {
    if (employeeEmail === "") {
      setEmailError("error");
      return;
    }
    setToken("1");
    //gen token
  };
  const sendEmail = () => {
    //emailjs
    var templateParams = {
      email: employeeEmail,
      name: "Xiaoyun Wang",
      registerUrl: "http://127.0.0.1:3000/register/" + token,
    };
    emailjs
      .send(
        "service_1qbtjn6",
        "template_5ib7nbj",
        templateParams,
        "9956vAL6uIAW9zoeP"
      )
      .then(
        (res) => console.log(res),
        (err) => {
          console.log(err);
        }
      );
  };
  const checkEmail = (email) => {
    return validator.isEmail(email) ? "" : "error";
  };
  return (
    <>
      Hiring Management page
      <Card style={{ display: "flex", justifyContent: "center" }}>
        <Space>
          <Space direction="vertical">
            <Form.Item label="Employee Email">
              <Input
                status={emailError}
                value={employeeEmail}
                onChange={(e) => onChange(e)}
                suffix={
                  emailError === "error" ? (
                    <Tooltip title="Wrong Email Format">
                      <CloseCircleOutlined />
                    </Tooltip>
                  ) : emailError === "" ? (
                    <></>
                  ) : (
                    <Tooltip title="Email Valid">
                      <CheckCircleOutlined style={{ color: "green" }} />
                    </Tooltip>
                  )
                }
              />
            </Form.Item>
            <Form.Item>
              <Space size="middle">
                <Button type="primary" onClick={() => generateToken()}>
                  GenerateToken
                </Button>
                {token}
              </Space>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                disabled={employeeEmail && token ? "" : "disabled"}
                onClick={() => sendEmail()}
              >
                Send Invitation
              </Button>
            </Form.Item>
          </Space>
        </Space>
      </Card>
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
export default OnBoardingHr;
