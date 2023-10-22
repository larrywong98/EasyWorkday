import sendRequest from "./sendRequest";

const setRegToken = async (email, fullName, navigate) => {
  const response = await sendRequest({
    url: "http://127.0.0.1:4000/api/auth/regtoken",
    method: "POST",
    data: JSON.stringify({
      email: email,
      fullName: fullName,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === "ok") {
    return response.token;
  } else if (response.status === "unauthorized") {
    return "unauthorized";
  } else {
    navigate("/error");
  }
};

const getAllRegToken = async (navigate) => {
  const response = await sendRequest({
    url: "http://127.0.0.1:4000/api/auth/regtoken/all",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === "ok") {
    return response.regToken;
  } else if (response.status === "unauthorized") {
    return "unauthorized";
  } else {
    navigate("/error");
  }
};

export { setRegToken, getAllRegToken };
