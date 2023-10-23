import { Alert, Box, Button } from "@mui/material";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Error = () => {
  const location = useLocation();
  const { message } = location?.state || { message: "Something is wrong" };
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "300px", sm: "500px", md: "500px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "400px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Alert
          severity="error"
          sx={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          {message}
        </Alert>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ width: "150px", height: "150px", borderRadius: "50%" }}
        >
          Go Home
        </Button>
      </Box>
    </Box>
  );
};
export default Error;
