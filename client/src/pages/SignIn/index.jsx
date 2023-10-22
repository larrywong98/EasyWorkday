import {
  Paper,
  Typography,
  Box,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getJwtToken, signInRequest } from "../../services/auth";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pwdShow, setPwdShow] = useState(true);
  const [authorized, setAuthorized] = useState(true);
  const userInfo = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("token") === null) {
      const status = await getJwtToken(username, password, navigate);
      if (status === "unauthorized") {
        setAuthorized(false);
      }
    }
    const response = await signInRequest(dispatch, navigate);
    // console.log(response);
  };
  return (
    <Paper
      elevation={3}
      sx={{
        position: "relative",

        width: { xs: "100%", md: "600px" },
        height: { xs: "500px", md: "500px" },
      }}
    >
      <Box sx={{ position: "absolute", top: "3%", right: "4%" }}>
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clipPath="url(#clip0_1_34)">
              <path
                d="M20 2.01429L17.9857 0L10 7.98571L2.01429 0L0 2.01429L7.98571 10L0 17.9857L2.01429 20L10 12.0143L17.9857 20L20 17.9857L12.0143 10L20 2.01429Z"
                fill="#373A3C"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_34">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </Box>
      <Box
        component="form"
        onSubmit={(e) => submit(e)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: { xs: "0px 16px", md: "0px 48px" },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "20px", md: "30px" },
            fontWeight: "600",
            marginTop: "44px",
          }}
        >
          Sign in to your account
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginTop: "42px",
              position: "relative",
            }}
          >
            <Typography variant="p" sx={{ fontSize: "16px" }}>
              Email
            </Typography>
            <OutlinedInput
              error={false}
              id="email"
              name="email"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              sx={{ height: "56px" }}
              inputProps={{
                style: {
                  WebkitBoxShadow: "0 0 0 1000px white inset",
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              position: "relative",
            }}
          >
            <Typography variant="p" sx={{ fontSize: "16px" }}>
              Password
            </Typography>
            <OutlinedInput
              error={false}
              id="password"
              name="password"
              type={pwdShow ? "password" : "text"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              // sx={{
              //   height: "56px",
              // }}
              inputProps={{
                style: { WebkitBoxShadow: "0 0 0 1000px white inset" },
              }}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    sx={{
                      backgroundColor: "transparent",
                      textDecoration: "underline",
                      color: "#6B7280",
                      textTransform: "none",
                    }}
                    onClick={() => setPwdShow(!pwdShow)}
                  >
                    {pwdShow ? "Show" : "Hide"}
                  </Button>
                </InputAdornment>
              }
            />
          </Box>

          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "100%",
              height: "47px",
              textTransform: "none",
              backgroundColor: "#5048e5",
              "&:hover": {
                backgroundColor: "#8648e5",
              },
            }}
          >
            Sign In
          </Button>
          <Box>
            {authorized ? <></> : <Typography>Wrong password</Typography>}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "end",
            alignItems: { xs: "center" },
            marginTop: "22px",
          }}
        >
          <Box>
            <Link to="/forget" style={{ color: "#5048e5" }}>
              Forget password?
            </Link>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default SignIn;
