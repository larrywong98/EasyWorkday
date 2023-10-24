import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import saveIncoming from "../../services/saveIncoming";
import validateEmail from "../../utils/validateEmail";
import CheckIcon from "@mui/icons-material/Check";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer);
  const userInfo = useSelector((state) => state.authReducer);
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (!validateEmail(data.email)) {
      setError("email", { type: "custom", message: "Email not valid" });
      return;
    }

    const response = await saveIncoming(data.email, data.fullName, navigate);
    navigate("/success", {
      state: { message: "Wait for Hr to send the registration link" },
    });
  };
  return (
    <Paper
      elevation={3}
      sx={{
        width: "800px",
        height: "700px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <Stack sx={{ display: "flex", alignItems: "center", marginTop: "40px" }}>
        <Box component="h1">Welcome to EasyWorkday</Box>
        <Box component="span">An Employee Management Website</Box>
      </Stack>
      <Stack
        direction="column"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
          marginTop: "100px",
        }}
      >
        {userInfo.signedIn ? (
          <Stack>
            <Box component="h2">Here are some steps for onboarding</Box>
            <Stack direction="row" sx={{ gap: "10px" }}>
              <Stack
                sx={{
                  justifyContent: "space-between",
                  padding: "20px 0",
                }}
              >
                {[true, true, true].map((show, index) => (
                  <CheckIcon key={index} sx={{ color: "green" }} />
                ))}
              </Stack>
              <List>
                {[
                  "Fill in Onboard Application",
                  "Upload your Visa Documents (visa status: F1)",
                  "Check and update your information in personal information page",
                ].map((text, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemText primary={`${index + 1}. ${text}`} />
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Stack>
        ) : (
          <Stack direction="row" sx={{ gap: "100px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack sx={{ gap: "10px" }}>
                <Box component="h3">First Time User?</Box>
                <TextField
                  label="name"
                  size="small"
                  {...register("fullName", { required: "Name is required" })}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
                <TextField
                  label="email"
                  size="small"
                  {...register("email", { required: "Email is required" })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                <Button type="submit" variant="contained" sx={{ fontSize: 12 }}>
                  Get Registration Link
                </Button>
              </Stack>
            </form>
            <Stack sx={{ height: "100%", gap: "10px" }}>
              <Box component="h3">Already have an account?</Box>
              <Button
                component={Link}
                variant="contained"
                to="/signin"
                sx={{ fontSize: 12 }}
              >
                Sign in Here
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};
export default Home;
