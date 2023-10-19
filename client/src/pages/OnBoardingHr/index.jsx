import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  List,
  Row,
  Space,
  Table,
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUser,
  setVisa,
  updateApplicationStatus,
  updateOnboardFeedback,
} from "../../reducer/userSlice";
import { status } from "../../reducer/global";
import { useEffect, useMemo, useState } from "react";
import validator from "validator";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import emailjs from "@emailjs/browser";
import { statusTrigger } from "../../reducer/statusSlice";
import sendRequest from "../../services/sendRequest";
import { useNavigate } from "react-router";
import { loadUserInfo } from "../../services/loadUserInfo";
import loadAllUser from "../../services/loadAllUser";
import Item from "antd/es/list/Item";
const { TextArea } = Input;

const OnBoardingHr = () => {
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState();
  const user = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  // const approve = () => {
  //   dispatch(updateOnboardFeedback({ onboardFeedback: "" }));
  //   dispatch(updateApplicationStatus({ applicationStatus: status.approved }));
  //   dispatch(setVisa({ status: "pending", index: 0 }));
  //   dispatch(statusTrigger({ status: "pending" }));
  // };
  // const reject = () => {
  //   dispatch(updateOnboardFeedback({ onboardFeedback: feedback }));
  //   dispatch(updateApplicationStatus({ applicationStatus: status.rejected }));
  // };
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
  const toUserDetail = async (i) => {
    // console.log("http://127.0.0.1:4000/api/emp/" + userId);
    const response = await loadUserInfo(data[i].userId);
    // details
    console.log(response);
    dispatch(loadUser({ user: response }));
    navigate("/hr/decision/" + data[i].userId);
    // back button
  };
  useEffect(() => {
    (async () => {
      const response = await loadAllUser();
      setData(response);
      setInitialData(response);
    })();
  }, []);
  const dataSource = useMemo(() => {
    return data.map((item, index) => {
      return {
        key: index,
        firstName: item.info.firstName,
        middleName: item.info.middleName,
        lastName: item.info.lastName,
        visaTitle: item.info.visaTitle,
        cellPhone: item.info.cellPhoneNumber,
        email: item.info.email,
        detail: (
          <Button onClick={() => toUserDetail(index)}>Go to Details</Button>
        ),
      };
    });
  }, [data]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Middle Name",
      dataIndex: "middleName",
      key: "middleName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Visa Title",
      dataIndex: "visaTitle",
      key: "visaTitle",
    },
    {
      title: "Cell Phone",
      dataIndex: "cellPhone",
      key: "cellPhone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
    },
  ];
  return (
    <>
      <Card style={{ width: "100%" }} title=" Hiring Management page">
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
      <Card style={{ width: "100%" }}>
        <Divider orientation="left">Default Size</Divider>
        <Table dataSource={dataSource} columns={columns} />;
      </Card>
    </>
  );
};
export default OnBoardingHr;
