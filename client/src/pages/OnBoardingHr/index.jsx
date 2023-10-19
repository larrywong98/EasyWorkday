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
import { Box, Paper, Typography, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import md5 from "md5";
const { TextArea } = Input;

const OnBoardingHr = () => {
  const dispatch = useDispatch();
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [regToken, setRegToken] = useState("");
  const [data, setData] = useState([]);
  const [emailSent, setEmailSent] = useState(false);
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
    if (emailSent === true) setEmailSent(false);
    if (regToken !== "") setRegToken("");
    if (emailError === true) setEmailError(false);
  };
  const checkEmail = (email) => {
    return validator.isEmail(email) ? true : false;
  };
  const generateToken = () => {
    if (employeeEmail === "") {
      setEmailError(true);
      return;
    }
    if (!checkEmail(employeeEmail)) {
      setEmailError(true);
      return;
    }

    setRegToken(md5(employeeEmail));
    //gen token
  };
  const sendEmail = () => {
    //emailjs
    var templateParams = {
      email: employeeEmail,
      name: "Xiaoyun Wang",
      registerUrl: "http://127.0.0.1:3000/register/" + regToken,
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
    setEmailSent(true);
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "80%",
      }}
    >
      <Paper
        elevation={3}
        title=" Hiring Management page"
        style={{ width: "100%" }}
      >
        <Box
          sx={{
            padding: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Box>
              <TextField
                label="Email"
                size="small"
                error={emailError}
                value={employeeEmail}
                onChange={(e) => onChange(e)}
                sx={{ width: "100%", height: "30px" }}
              />
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>{regToken}</Typography>
                <Button type="primary" onClick={() => generateToken()}>
                  GenerateToken
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <Typography sx={{ color: "green" }}>
                {emailSent ? "Email Sent!" : ""}
              </Typography>

              <Button
                type="primary"
                disabled={employeeEmail && regToken ? "" : "disabled"}
                onClick={() => sendEmail()}
              >
                Send Invitation
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Paper
        elevation={3}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
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
            width: "800px",
            "& .MuiDataGrid-cell:hover": {
              cursor: "pointer",
            },
          }}
          // checkboxSelection
        />
      </Paper>
    </Box>
  );
};
export default OnBoardingHr;
