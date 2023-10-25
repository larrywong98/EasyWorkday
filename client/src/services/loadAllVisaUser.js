import sendRequest from "./sendRequest";

const loadAllVisaUser = async () => {
  const response = await sendRequest({
    url: "http://127.0.0.1:4000/api/visa/all",
    method: "GET",
  });
  if (response === "error") {
    return "error";
  }
  return response.status;
};

export default loadAllVisaUser;
