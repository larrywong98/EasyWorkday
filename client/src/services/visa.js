import sendRequest from "./sendRequest";

const updateVisaFile = async (index, userId, fileInfo, navigate) => {
  const response = await sendRequest({
    url: "http://127.0.0.1:4000/api/visa/",
    method: "PUT",
    data: JSON.stringify({ index: index, userId: userId, fileInfo: fileInfo }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  if (response.status === "ok") {
    localStorage.setItem("token", response.token);
    return "ok";
  } else if (response.status === "unauthorized") {
    return "unauthorized";
  } else {
    navigate("/error");
  }
};

export { updateVisaFile };
