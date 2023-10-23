import { Alert, Box, InputAdornment, Paper, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import loadAllUser from "../../services/loadAllUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SearchIcon from "@mui/icons-material/Search";

const VisaHrAll = () => {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [showError, setShowError] = useState(false);
  const tableData = useMemo(() => {
    const tmp = data.map((item, index) => {
      let fullName = "null";
      if (item.info.firstName !== "") fullName = item.info.firstName;
      if (item.info.middleName !== "") fullName += " " + item.info.middleName;
      if (item.info.lastName !== "") fullName += " " + item.info.lastName;
      if (item.info.visaTitle === "") item.info.visaTitle = "null";
      if (item.info.visaDate[0] === "") item.info.visaDate[0] = "null";
      if (item.info.visaDate[1] === "") item.info.visaDate[1] = "null";

      return {
        id: index,
        fullName: fullName,
        status: item.applicationStatus,
        ...item.info,
        daysRemaining: 1,
        startDate: item.info.visaDate[0],
        endDate: item.info.visaDate[1],
        profilePicture: item.files[0][0]?.url,
        driverLicense: item.files[1][0]?.url,
        workAuthorization: item.files[2][0]?.url,
        opt: item.files[3][0]?.url,
        ead: item.files[4][0]?.url,
        i983: item.files[5][0]?.url,
        i20: item.files[6][0]?.url,
      };
    });
    return tmp;
  }, [data]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer);
  const onCellClick = (params) => {
    console.log(params);
    if (params.value === undefined) {
      return;
    }
    if (
      [
        "profilePicture",
        "driverLicense",
        "workAuthorization",
        "opt",
        "ead",
        "i983",
        "i20",
      ].includes(params.field)
    ) {
      window.location.href = params.row[params.field];
    }
  };
  const columns = [
    {
      headerName: "Full Legal Name",
      field: "fullName",
      width: 150,
      cellClassName: (params) => {
        if (params.value === "null") {
          return "";
        }
        return "full-name";
      },
    },
    {
      headerName: "Visa Title",
      field: "visaTitle",
      width: 150,
    },
    {
      headerName: "Start Date",
      field: "startDate",
      width: 120,
    },
    {
      headerName: "End Date",
      field: "endDate",
      width: 120,
    },
    {
      headerName: "Days Remaining",
      field: "daysRemaining",
      width: 120,
    },
    {
      headerName: "Next Step",
      field: "status",
      width: 100,
    },
    {
      headerName: "ProfilePicture",
      field: "profilePicture",
      width: 100,
      renderCell: (params) => {
        if (params.value === undefined) {
          return "null";
        }
        return (
          <a href={params.value} download>
            profilePic
          </a>
        );
      },
    },
    {
      headerName: "DriverLicense",
      field: "driverLicense",
      width: 100,
      renderCell: (params) => {
        if (params.value === undefined) {
          return "null";
        }
        return <a href={params.value}>driverLicense</a>;
      },
    },
    {
      headerName: "WorkAuthorization",
      field: "workAuthorization",
      width: 100,
      renderCell: (params) => {
        if (params.value === undefined) {
          return "null";
        }
        return <a href={params.value}>workAuthorization</a>;
      },
    },
    {
      headerName: "Opt",
      field: "opt",
      width: 100,
      renderCell: (params) => {
        if (params.value === undefined) {
          return "null";
        }
        return <a href={params.value}>opt</a>;
      },
    },
    {
      headerName: "Ead",
      field: "ead",
      width: 100,
      renderCell: (params) => {
        if (params.value === undefined) {
          return "null";
        }
        return <a href={params.value}>ead</a>;
      },
    },
    {
      headerName: "I983",
      field: "i983",
      width: 100,
      renderCell: (params) => {
        if (params.value === undefined) {
          return "null";
        }
        return <a href={params.value}>i983</a>;
      },
    },
    {
      headerName: "I20",
      field: "i20",
      width: 100,
      renderCell: (params) => {
        if (params.value === undefined) {
          return "null";
        }
        return <a href={params.value}>i20</a>;
      },
    },
  ];

  const filterData = (text) => {
    if (text === "") {
      return initialData;
    }
    return initialData
      .map((item) => {
        if (
          item.info.firstName.toLowerCase().includes(text) ||
          item.info.lastName.toLowerCase().includes(text) ||
          item.info.preferredName.toLowerCase().includes(text)
        ) {
          return item;
        }
      })
      .filter((item) => item !== undefined)
      .filter((item) => item.info.firstName !== "null");
  };

  // const [filterModel, setFilterModel] = useState();
  const searchOnChange = (e) => {
    let newData = filterData(e.target.value);
    setData(newData);
  };
  useEffect(() => {
    (async () => {
      let response = await loadAllUser();
      setData(response);
      setInitialData(response);
    })();
  }, []);
  return (
    <>
      <Box
        component={Paper}
        sx={{
          position: "absolute",
          top: "10%",
          opacity: showError ? "1" : "0",
          transition: "all .5s",
          visibility: showError ? "visible" : "hidden",
        }}
      >
        <Alert severity="warning">
          Only approved profile can be viewed. Otherwise approve the onboarding
          application !
        </Alert>
      </Box>

      <Paper
        elevation={3}
        sx={{
          width: { xs: "100%", sm: "100%", md: "1100px" },
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", sm: "center", md: "start" },
          padding: "20px",
          // justifyContent: "center",
        }}
      >
        <Box component="h2">Employee Visa Management</Box>
        <Box sx={{ margin: "20px 0" }}>
          <TextField
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              searchOnChange(e);
            }}
          />
        </Box>
        <DataGrid
          rows={tableData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
            sorting: {
              sortModel: [{ field: "lastName", sort: "asc" }],
            },
          }}
          // filterModel={filterModel}
          //   onCellClick={(e) => toUserProfileDetail(e.row.id)}
          onCellClick={(params) => onCellClick(params)}
          pageSizeOptions={[5, 10]}
          sx={{
            width: "100%",
            "& .full-name": {
              textDecoration: "underline",
            },
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
          // checkboxSelection
        />
      </Paper>
    </>
  );
};
export default VisaHrAll;
