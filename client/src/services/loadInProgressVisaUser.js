import sendRequest from "./sendRequest";

const loadInProgressVisaUser = async () => {
  const response = await sendRequest({
    url: "http://127.0.0.1:4000/api/visa/inprogress",
    method: "GET",
  });
  return response.status;
};

export default loadInProgressVisaUser;
