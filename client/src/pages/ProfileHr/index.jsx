import { Box, Paper } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { status } from "../../reducer/global";
import loadAllUser from "../../services/loadAllUser";

const ProfileHr = () => {
  const toUserProfileDetail = () => {};
  const [data, setData] = useState([]);
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
  useEffect(() => {
    (async () => {
      let response = await loadAllUser();

      setData(response);
      // setInitialData(response);
    })();
  }, []);
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: { md: "1000px" },
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          // justifyContent: "center",
        }}
      >
        <Box component="h2">Employee Profiles</Box>
        <DataGrid
          rows={tableData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          onRowClick={(e) => toUserProfileDetail(e.row.id)}
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
          // checkboxSelection
        />
      </Paper>
    </>
  );
};
export default ProfileHr;
