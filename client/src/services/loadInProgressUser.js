import sendRequest from "./sendRequest";

const loadInProgressUser = async () => {
  const response = await sendRequest({
    url: "http://127.0.0.1:4000/api/emp/inprogress",
    method: "GET",
  });
  return response.status;
};

export default loadInProgressUser;
