import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../reducer/userSlice";
import { useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router";
import { loadUserInfo } from "../../services/loadUserInfo";
import loadAllUser from "../../services/loadAllUser";
import {
  Box,
  Paper,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { status } from "../../reducer/global";
import clsx from "clsx";
import { setRegToken, getAllRegToken } from "../../services/regToken";
import validateEmail from "../../utils/validateEmail";

const OnBoardingHr = () => {
  const dispatch = useDispatch();
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [regToken, setLocalRegToken] = useState("");
  const [data, setData] = useState([]);
  const [registerData, setRegisterData] = useState([]);
  const [emailSent, setEmailSent] = useState(false);
  // const [tableData, setTableData] = useState([]);
  const valueToStatus = (value) => {
    const statusText = Object.keys(status).find((key) => status[key] === value);
    return statusText;
  };
  const tableData = useMemo(() => {
    return data.map((item, index) => {
      if (item.info.firstName === "") item.info.firstName = "null";
      if (item.info.middleName === "") item.info.middleName = "null";
      if (item.info.lastName === "") item.info.lastName = "null";
      if (item.info.visaTitle === "") item.info.visaTitle = "null";
      if (item.info.cellPhoneNumber === "") item.info.cellPhoneNumber = "null";
      if (item.info.email === "") item.info.email = "null";
      return {
        id: index,
        status: valueToStatus(item.applicationStatus),
        ...item.info,
      };
    });
  }, [data]);

  const [initialData, setInitialData] = useState();
  const user = useSelector((state) => state.userReducer);

  const navigate = useNavigate();

  // };
  const onChange = (e) => {
    setEmployeeEmail(e.target.value);
    if (emailSent === true) setEmailSent(false);
    if (regToken !== "") setLocalRegToken("");
    if (emailError === true) setEmailError(false);
  };

  const generateToken = async () => {
    if (employeeEmail === "") {
      setEmailError(true);
      return;
    }
    if (!validateEmail(employeeEmail)) {
      setEmailError(true);
      return;
    }

    //generate registration token
    const response = await setRegToken(employeeEmail, navigate);
    setLocalRegToken(response);

    //save to history
    const response1 = await getAllRegToken(navigate);
    setRegisterData(response1);
  };
  const sendEmail = async () => {
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
    if (data[i].applicationStatus === "0") {
      return;
    }
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
      let regResponse = await getAllRegToken(navigate);

      setData(response);
      setRegisterData(regResponse);
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
    {
      headerName: "Status",
      field: "status",
      width: 100,
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }
        return clsx("app-status", {
          pending: params.value === "pending",
          approved: params.value === "approved",
          rejected: params.value === "rejected",
        });
      },
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        title=" Hiring Management page"
        style={{ width: "1000px" }}
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
            <Box component="h2">Invite new Employee</Box>
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
                  gap: "20px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textWrap: "nowrap",
                  }}
                >
                  {regToken}
                </Box>

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
              <Box component="span" sx={{ color: "green" }}>
                {emailSent ? "Email Sent!" : ""}
              </Box>

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
        title=" Hiring Management page"
        style={{ width: "1000px", padding: "20px" }}
      >
        <Box component="h2">Registration History</Box>
        <TableContainer component={Paper} sx={{ maxHeight: "500px" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Registration Token</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registerData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: "500px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textWrap: "nowrap",
                      }}
                    >
                      {row.regToken}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ width: "100px" }}>{row.regStatus}</Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          width: { md: "1000px" },
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Box component="h2">Application Status</Box>
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
            width: "100%",
            "& .MuiDataGrid-cell:hover": {
              cursor: "pointer",
            },
            "& .app-status.pending": {
              color: "#ff9800",
            },
            "& .app-status.approved": {
              color: "green",
            },
            "& .app-status.rejected": {
              color: "red",
            },
          }}
          slots={{ toolbar: GridToolbar }}
        />
      </Paper>
    </Box>
  );
};
export default OnBoardingHr;
