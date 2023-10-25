import sendRequest from "./sendRequest";

const loadAllUser = async () => {
  const response = await sendRequest({
    url: "http://127.0.0.1:4000/api/emp/all",
    method: "GET",
  });
  if (response === "error") {
    // navigate("/error");
    return "error";
  }
  return response.status;
};

export default loadAllUser;
