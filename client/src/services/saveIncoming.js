import sendRequest from "./sendRequest";

const saveIncoming = async (email, fullName, navigate) => {
  const response = await sendRequest({
    url: "http://127.0.0.1:4000/api/incoming/save",
    method: "POST",
    data: JSON.stringify({
      email: email,
      fullName: fullName,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === "ok") {
    return "ok";
  } else {
    navigate("/error");
  }
};

export default saveIncoming;
