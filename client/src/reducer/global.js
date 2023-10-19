const statusProperties = ["optStatus", "eadStatus", "i983Status", "i20Status"];

const receiptProperties = [
  "optFeedback",
  "eadFeedback",
  "i983Feedback",
  "i20Feedback",
];

const NextSteps = {
  opt: [
    "Waiting for HR to approve your OPT Receipt",
    "Please upload a copy of your OPT EAD",
  ],
  ead: [
    "Waiting for HR to approve your OPT EAD",
    "Please download and fill out the I-983 form",
  ],
  i983: [
    "Waiting for HR to approve your and sign your I-983",
    "Please send the I-983 along with all necesseay documents to your school and upload the new I-20",
  ],
  i20: [
    "Waiting for HR to approve your I-20",
    "All documents have been approved",
  ],
};

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

export { status, fileName, statusProperties, receiptProperties, NextSteps };
