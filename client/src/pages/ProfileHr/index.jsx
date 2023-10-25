import { Alert, Box, InputAdornment, Paper, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import loadAllUser from "../../services/loadAllUser";
import { loadUser } from "../../reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SearchIcon from "@mui/icons-material/Search";

const ProfileHr = () => {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [showError, setShowError] = useState(false);
  // const valueToStatus = (value) => {
  //   const statusText = Object.keys(status).find((key) => status[key] === value);
  //   return statusText;
  // };
  const tableData = useMemo(() => {
    return data.map((item, index) => {
      let fullName = "null";
      if (item.info.firstName === "") item.info.firstName = "null";
      if (item.info.middleName === "") item.info.middleName = "null";
      if (item.info.lastName === "") item.info.lastName = "null";
      if (item.info.visaTitle === "") item.info.visaTitle = "null";
      if (item.info.cellPhoneNumber === "") item.info.cellPhoneNumber = "null";
      if (item.info.email === "") item.info.email = "null";
      if (item.info.firstName !== "null") fullName = item.info.firstName;
      if (item.info.middleName !== "null")
        fullName += " " + item.info.middleName;
      if (item.info.lastName !== "null") fullName += " " + item.info.lastName;

      return {
        id: index,
        fullName: fullName,
        status: item.applicationStatus,
        ...item.info,
      };
    });
  }, [data]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer);
  const toUserProfileDetail = (index) => {
    if (data[index].applicationStatus === "approved") {
      const selectedUser = data[index];
      dispatch(loadUser({ user: selectedUser }));
      navigate("/emp/profile/view");
      return;
    }
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 3000);
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
      headerName: "First Name",
      field: "firstName",
      width: 100,
    },
    // {
    //   headerName: "Middle Name",
    //   field: "middleName",
    //   width: 120,
    // },
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
    // Need MUI PRO Version for filter with or condition
    // $180 license Orz
    // const newModel = {
    //   items: [
    //     {
    //       id: 1,
    //       field: "firstName",
    //       operator: "contains",
    //       value: e.target.value,
    //     },
    //     {
    //       id: 2,
    //       field: "lastName",
    //       operator: "contains",
    //       value: e.target.value,
    //     },
    //     {
    //       id: 3,
    //       field: "preferredName",
    //       operator: "contains",
    //       value: e.target.value,
    //     },
    //   ],
    //   logicOperator: GridLogicOperator.Or,
    // };
    // setFilterModel(newModel);
  };
  useEffect(() => {
    (async () => {
      let response = await loadAllUser();
      if (response === "error") {
        navigate("/error");
      }
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
          width: { xs: "100%", sm: "100%", md: "950px" },
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", sm: "center", md: "start" },
          padding: "20px",
          // justifyContent: "center",
        }}
      >
        <Box component="h2">Employee Profiles</Box>
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
          onRowClick={(e) => toUserProfileDetail(e.row.id)}
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
export default ProfileHr;
