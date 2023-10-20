import md5 from "md5";
const generateUserId = () => {
  return md5(Date.now());
};
export default generateUserId;
