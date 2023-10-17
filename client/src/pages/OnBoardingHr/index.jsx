import { Button, Card, Divider, Form, Input, List, Space, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setVisa,
  updateApplicationStatus,
  updateOnboardFeedback,
} from "../../reducer/userSlice";
import { status } from "../../reducer/global";
import { useEffect, useState } from "react";
import validator from "validator";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import emailjs from "@emailjs/browser";
import { statusTrigger } from "../../reducer/statusSlice";
import sendRequest from "../../services/sendRequest";
const { TextArea } = Input;

const OnBoardingHr = () => {
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.userReducer);

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
  const toUserDetail = async (userId) => {
    // console.log("http://127.0.0.1:4000/api/emp/" + userId);
    const response = await sendRequest({
      url: "http://127.0.0.1:4000/api/emp/" + userId,
      method: "GET",
    });
    // details
    console.log(response);
    // load to userSlice  disabled form
    // back button
  };
  useEffect(() => {
    (async () => {
      const response = await sendRequest({
        url: "http://127.0.0.1:4000/api/emp/all",
        method: "GET",
      });
      setData(response);
    })();
  }, []);
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
        <Divider orientation="left">Default Size</Divider>
        <List size="large" bordered header={<div>Header</div>}>
          {data.map((item, index) => (
            <List.Item key={index}>
              {item.info.firstName} {item.info.middleName} {item.info.lastName}
              <Divider type="vertical"></Divider>
              {item.info.ssn} {item.info.visaTitle} {item.info.cellPhoneNumber}{" "}
              {item.info.email}
              <Button onClick={() => toUserDetail(item.userId)}>
                Go to Details
              </Button>
            </List.Item>
          ))}
        </List>

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
