import generateUserId from "../utils/generateUserId";
import sendRequest from "./sendRequest";

const saveInfo = async (user, newData) => {
  const response = await sendRequest({
    url:
      "http://127.0.0.1:4000/api/emp/save/" + (user.userId || generateUserId()),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(newData),
    // {
    // role: user.role,
    // applicationStatus: status.pending,
    // onboardFeedback: user.onboardFeedback,
    // info: data,
    // visa: user.visa,
    // files: user.files,
    // createDate: user.createDate,
    // lastUpdateDate: user.lastUpdateDate,
    // deleteDate: user.deleteDate,
    // }),
  });
  return response.status;
};

export default saveInfo;
