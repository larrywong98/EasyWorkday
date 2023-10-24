import { Box, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const VisaHr = () => {
  return (
    <>
      <Paper
        sx={{
          width: "500px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button component={Link} to="inprogress" variant="contained">
          See in progress
        </Button>
        <Button component={Link} to="all" variant="contained">
          See all Employee Visa
        </Button>
      </Paper>
    </>
  );
};
export default VisaHr;
