import {
  Box,
  Button,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Home = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "800px",
        height: "700px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        direction="column"
        sx={{ display: "flex", alignItems: "center", gap: "40px" }}
      >
        <Stack sx={{ display: "flex", alignItems: "center" }}>
          <Box component="h2">Welcome to EasyWorkday</Box>
          <Box component="span">An Employee Management Website</Box>
        </Stack>

        <Stack direction="row" sx={{ display: "flex", gap: "40px" }}>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack sx={{ display: "flex", gap: "10px" }}>
                <Box component="span">First Time User?</Box>
                <TextField
                  label="name"
                  {...register("fullName", { required: "Name is required" })}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
                <TextField
                  label="email"
                  {...register("email", { required: "Email is required" })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                <Button type="submit" variant="contained">
                  Get Registration Link
                </Button>
              </Stack>
            </form>
          </Box>
          <Stack>
            <Box component="span">Already have an account?</Box>
            <Box component="span">Sign in Here</Box>
            <Link to="/signin">Signin</Link>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
export default Home;
