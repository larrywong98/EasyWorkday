import sendRequest from "./sendRequest";

const removeIncoming = async (email, navigate) => {
  console.log(email);
  const response = await sendRequest({
    url: "http://127.0.0.1:4000/api/incoming/",
    method: "DELETE",
    data: JSON.stringify({
      email: email,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === "ok") {
    return "ok";
  } else {
    navigate("/error");
  }
};

export default removeIncoming;
