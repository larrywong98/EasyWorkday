import sendRequest from "./sendRequest";

const loadUserInfo = async (userId) => {
  const response = await sendRequest({
    url: "http://127.0.0.1:4000/api/emp/" + userId,
    method: "GET",
  });
  return response.status;
};
export { loadUserInfo };
