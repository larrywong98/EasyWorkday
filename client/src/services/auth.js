import { signIn } from "../reducer/authSlice";
import sendRequest from "./sendRequest";

const getJwtToken = async (username, password, navigate) => {
  const response = await sendRequest({
    url: "http://127.0.0.1:4000/api/auth/token",
    method: "POST",
    data: JSON.stringify({ name: username, pwd: password }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === "ok") {
    localStorage.setItem("token", response.token);
    return "ok";
  } else if (response.status === "unauthorized") {
    return "unauthorized";
  } else {
    navigate("/error");
  }
};

const signInRequest = async (dispatch, navigate) => {
  const response = await sendRequest({
    url: "http://127.0.0.1:4000/api/auth/signin",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  if (response.status === "unauthorized") {
    return "unauthorized";
  } else if (response.status === "error") {
    navigate("/error");
    return "error";
  }
  dispatch(
    signIn({
      userId: response.status.userId,
      userName: response.status.userName,
      email: response.status.email,
      role: response.status.role,
    })
  );
  navigate("/success", { state: { message: "Login Successful" } });
  return "ok";
};

const signUpRequest = async (username, password, email, navigate) => {
  const response = await sendRequest({
    url: "http://127.0.0.1:4000/api/auth/signup",
    method: "POST",
    data: JSON.stringify({ userName: username, email: email, pwd: password }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === "ok") {
    navigate("/success", { state: { message: "Sign Up Successful" } });
    return "ok";
  } else if (response.status === "exist") {
    return "exist";
  } else {
    navigate("/error");
    return "error";
  }
};

export { getJwtToken, signInRequest, signUpRequest };