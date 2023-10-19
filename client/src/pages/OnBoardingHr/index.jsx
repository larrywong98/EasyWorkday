import { Form, Button, Input, Space, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../reducer/userSlice";
import { useEffect, useMemo, useState } from "react";
import validator from "validator";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router";
import { loadUserInfo } from "../../services/loadUserInfo";
import loadAllUser from "../../services/loadAllUser";
import Item from "antd/es/list/Item";
import { Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const { TextArea } = Input;

const OnBoardingHr = () => {
  const dispatch = useDispatch();
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  // const [tableData, setTableData] = useState([]);
  const tableData = useMemo(() => {
    return data.map((item, index) => {
      return {
        id: index,
        ...item.info,
      };
    });
  }, [data]);
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
    console.log(i);
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
      let response = await loadAllUser();
      setData(response);

      setInitialData(response);
    })();
  }, []);
  // const dataSource = useMemo(() => {
  //   return data.map((item, index) => {
  //     return {
  //       key: index,
  //       firstName: item.info.firstName,
  //       middleName: item.info.middleName,
  //       lastName: item.info.lastName,
  //       visaTitle: item.info.visaTitle,
  //       cellPhone: item.info.cellPhoneNumber,
  //       email: item.info.email,
  //       detail: (
  //         <Button onClick={() => toUserDetail(index)}>Go to Details</Button>
  //       ),
  //     };
  //   });
  // }, [data]);

  const columns = [
    {
      headerName: "First Name",
      field: "firstName",
      width: 100,
    },
    {
      headerName: "Middle Name",
      field: "middleName",
      width: 120,
    },
    {
      headerName: "Last Name",
      field: "lastName",
      width: 100,
    },
    {
      headerName: "Visa Title",
      field: "visaTitle",
      width: 150,
    },
    {
      headerName: "Cell Phone",
      field: "cellPhoneNumber",
      width: 120,
    },
    {
      headerName: "Email",
      field: "email",
      width: 180,
    },
  ];
  return (
    <>
      {/* <Card style={{ width: "100%" }} title=" Hiring Management page">
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
      </Card> */}
      <Paper title=" Hiring Management page" style={{ width: "100%" }}>
        <Box>
          <Box>
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
          </Box>
        </Box>
      </Paper>
      <Paper style={{ width: "100%" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          onRowClick={(e) => toUserDetail(e.row.id)}
          pageSizeOptions={[5, 10]}
          sx={{
            "& .MuiDataGrid-cell:hover": {
              cursor: "pointer",
            },
          }}
          // checkboxSelection
        />
      </Paper>
    </>
  );
};
export default OnBoardingHr;
