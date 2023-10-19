import {
  Container,
  Paper,
  Typography,
  Box,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getJwtToken, signInRequest, signUpRequest } from "../services/auth";
import validateEmail from "../../utils/validateEmail";
import { signUpRequest } from "../../services/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [pwdShow, setPwdShow] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [pwdRepeat, setPwdRepeat] = useState(false);
  const user = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const initState = () => {
  // setEmail("");
  // setPassword("");
  // setUnauthorized(false);
  // setUserExist(false);
  // setFirstLoad(true);
  // };
  // useEffect(() => {
  //   if (user.signedIn) {
  //     navigate("/products");
  //   }
  // }, []);

  const handlePwdRepeat = () => {
    if (password !== passwordConfirm) setPwdRepeat(true);
    else setPwdRepeat(false);
  };

  const handlePwdChange = (e) => {
    setPassword(e.target.value);
    setPasswordConfirm("");
    setPwdRepeat(false);
  };

  const handlePwdConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    // if (password === passwordConfirm)
    //   setPwdRepeat(true);
    // else
    //   setPwdRepeat(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (pwdRepeat || validateEmail(email) === false || password === "") {
      setFirstLoad(false);
      return;
    }

    const response = await signUpRequest(username, password, email, navigate);
    console.log(response);

    setEmail("");
    setPassword("");
    setUsername("");
    setPasswordConfirm("");
  };
  return (
    <div>
      <Container
        maxWidth="sm"
        sx={{
          width: { xs: "100%", md: "800px" },
          height: { xs: "700px", md: "700px" },
          padding: "16px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            position: "relative",
            height: { xs: "100%", md: "700px" },
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
              {"Sign up with new account "}
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
                  Username
                </Typography>
                <OutlinedInput
                  error={!firstLoad && username === ""}
                  id="username"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  sx={{ height: "56px" }}
                  inputProps={{
                    style: {
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    color: "#FC5A44",
                    position: "absolute",
                    top: "80px",
                    right: "0px",
                  }}
                >
                  <Typography variant="p" sx={{ fontSize: "14px" }}>
                    {!firstLoad && username === ""
                      ? "Field Required"
                      : ""}
                  </Typography>
                </Box>

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
                  Email
                </Typography>
                <OutlinedInput
                  error={!firstLoad && !validateEmail(email) ? true : false}
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  sx={{ height: "56px" }}
                  inputProps={{
                    style: {
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    color: "#FC5A44",
                    position: "absolute",
                    top: "80px",
                    right: "0px",
                  }}
                >
                  <Typography variant="p" sx={{ fontSize: "14px" }}>
                    {!firstLoad && username === "" ? "Field Required" : ""}
                  </Typography>
                </Box>
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
                  error={!firstLoad && password === "" ? true : false}
                  id="password"
                  name="password"
                  type={pwdShow ? "password" : "text"}
                  // onBlur={handlePwdRepeat}
                  onChange={handlePwdChange}
                  value={password}
                  sx={{
                    height: "56px",
                  }}
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

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    color: "#FC5A44",
                    position: "absolute",
                    top: "80px",
                    right: "0px",
                  }}
                >
                  <Typography variant="p" sx={{ fontSize: "14px" }}>
                    {!firstLoad && password === ""
                      ? "Invalid Password Input"
                      : ""}
                  </Typography>
                </Box>
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
                  Password Confirm
                </Typography>
                <OutlinedInput
                  error={(!firstLoad && passwordConfirm === "") || pwdRepeat}
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type={pwdShow ? "password" : "text"}
                  onBlur={handlePwdRepeat}
                  onChange={handlePwdConfirmChange}
                  value={passwordConfirm}
                  sx={{
                    height: "56px",
                  }}
                  inputProps={{
                    style: { WebkitBoxShadow: "0 0 0 1000px white inset" },
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    color: "#FC5A44",
                    position: "absolute",
                    top: "80px",
                    right: "0px",
                  }}
                >
                  <Typography variant="p" sx={{ fontSize: "14px" }}>
                    {!firstLoad && passwordConfirm === ""
                      ? "Filed Required"
                      : pwdRepeat
                      ? "Passwords Not Match "
                      : ""}
                  </Typography>
                </Box>
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
                Sign Up
              </Button>
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "center" },
                gap: { xs: "12px" },
                fontSize: "14px",
                marginTop: "22px",
              }}
            >
              <Box>
                <Typography variant="span">
                  Already have an account?&nbsp;
                </Typography>
                <Link
                  to="/signin"
                  // onClick={initState}
                  style={{ color: "#5048e5" }}
                >
                  Sign in
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default SignUp;
