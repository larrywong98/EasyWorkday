import sendRequest from "./sendRequest";

const loadAllVisaUser = async () => {
  const response = await sendRequest({
    url: "http://127.0.0.1:4000/api/emp/all",
    method: "GET",
  });
  return response.status;
};

export default loadAllVisaUser;
