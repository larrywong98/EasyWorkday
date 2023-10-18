import validator from "validator";
const validateEmail = (username) => {
  return validator.isEmail(username);
};

export default validateEmail;
