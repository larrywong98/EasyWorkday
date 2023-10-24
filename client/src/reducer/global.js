const temps = [
  "http://144.202.42.97:8001/resources/file1697694755133.pdf",
  "http://144.202.42.97:8001/resources/file1697754845740.pdf",
];

const statusProperties = ["optStatus", "eadStatus", "i983Status", "i20Status"];
// const feedbackKey = [
//   "optFeedback",
//   "eadFeedback",
//   "i983Feedback",
//   "i20Feedback",
// ];

const receiptProperties = [
  "optFeedback",
  "eadFeedback",
  "i983Feedback",
  "i20Feedback",
];

const visas = ["opt", "ead", "i983", "i20"];

// const nextStep = [
//   [
//     "Waiting for HR to approve your OPT Receipt",
//     "Please upload a copy of your OPT EAD",
//   ],
//   [
//     "Waiting for HR to approve your OPT EAD",
//     "Please download and fill out the I-983 form",
//   ],
//   [
//     "Waiting for HR to approve your and sign your I-983",
//     "Please send the I-983 along with all necesseay documents to your school and upload the new I-20",
//   ],
//   ["Waiting for HR to approve your I-20", "All documents have been approved"],
// ];

const nextSteps = {
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
  initial: "initial",
  partial: "partial",
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
  deleted: "deleted",
};

const fileName = {
  ProfilePicture: 0,
  DriverLicense: 1,
  WorkAuthorization: 2,
  Opt: 3,
  Ead: 4,
  I983: 5,
  I20: 6,
};

export {
  status,
  fileName,
  statusProperties,
  receiptProperties,
  // feedbackKey,
  // nextStep,
  nextSteps,
  visas,
  temps,
};
