import sendRequest from "./sendRequest";

const getIncoming = async (navigate) => {
  const response = await sendRequest({
    url: "http://127.0.0.1:4000/api/incoming/",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === "ok") {
    return response.incoming;
  } else if (response.status === "unauthorized") {
    return "unauthorized";
  } else {
    navigate("/error");
    return "error";
  }
};

export default getIncoming;
