import sendRequest from "./sendRequest";

const loadHistory = async () => {
  const response = await sendRequest({
    url: "http://127.0.0.1:4000/api/register/",
    method: "GET",
  });
  return response.status;
};

export default loadHistory;
