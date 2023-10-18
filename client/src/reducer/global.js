const statusProperties = ["optStatus", "eadStatus", "i983Status", "i20Status"];

const receiptProperties = [
  "optFeedback",
  "eadFeedback",
  "i983Feedback",
  "i20Feedback",
];

const status = {
  initial: "0",
  partial: "1",
  pending: "2",
  approved: "4",
  rejected: "5",
  deleted: "6",
};

const fileName = {
  ProfilePicture: 0,
  DriverLicense: 1,
  WorkAuthorization: 2,
  OptReceipt: 3,
  OptEad: 4,
  I983: 5,
  I20: 6,
};

export { status, fileName, statusProperties, receiptProperties };
