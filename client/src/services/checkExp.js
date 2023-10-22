// import sendRequest from "./sendRequest";

// const checkExp = async (token, navigate) => {
//   const response = await sendRequest({
//     url: "http://127.0.0.1:4000/api/auth/checkexp",
//     method: "GET",
//     headers: { authorization: "Bearer " + token },
//   });
//   if (response.status === "valid") {
//     return "ok";
//   } else if (response.status === "expired") {
//     return "expired";
//   } else {
//     navigate("/error");
//   }
// };
// export default checkExp;
