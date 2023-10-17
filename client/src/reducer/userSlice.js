import { createSlice } from "@reduxjs/toolkit";
import { fileName, status } from "./global";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    role: "emp",
    applicationStatus: status.initial,
    visaStatus: status.initial,
    onboardFeedback: "",

    info: {
      // section 1
      firstName: "Xiaoyun",
      lastName: "Wang",
      middleName: "middle",
      preferredName: "larry",

      ssn: "000000000",

      dob: "2014/01/01",
      gender: "None",

      // section 2
      address: "building apt street city state zip",

      // section 3
      cellPhoneNumber: "0000000000",
      workPhoneNumber: "0000000000",
      email: "xxx@gmail.com",

      // section 4
      usCitizen: "No",
      visaTitle: "F1(CPT/OPT)",
      visaDate: ["2015/01/01", "2015/01/02"],

      // section 5
      reference: [
        {
          firstName: "11",
          lastName: "11",
          middleName: "11",
          preferredName: "11",
          phone: "11",
          email: "11",
          relationship: "11",
        },
      ],
      emergency: [
        {
          firstName: "22",
          lastName: "22",
          middleName: "22",
          preferredName: "22",
          phone: "22",
          email: "22",
          relationship: "22",
        },
      ],
    },
    // const user = useselector (state=>  state.userReducer)
    // user.visa
    visa: {
      optStatus: "",
      optFeedback: "",

      eadStatus: "",
      eadFeedback: "",

      i983Status: "",
      i983Feedback: "",

      i20Status: "",
      i20Feedback: "",
    },

    //const fileName = {
    //   profilePicture: 0,
    //   driverLicense: 1,
    //   workAuthorization: 2,
    //   optReceipt: 3,
    //   optEad: 4,
    //   i983: 5,
    //   i20: 6,
    // };
    // profilePicture driverLicense workAuthorization optReceipt optEad i983 i20
    files: [[], [], [], [], [], [], []],

    // dates
    createDate: "",
    lastUpdateDate: "",
    deleteDate: "",
  },

  reducers: {
    setVisa: (state, action) => {
      const { status, index } = action.payload;
      // Create an array of the status property names
      const statusProperties = [
        "optStatus",
        "eadStatus",
        "i983Status",
        "i20Status",
      ];
      // Update the status property in the visa object using the index
      if (index < statusProperties.length) {
        const propertyToUpdate = statusProperties[index];
        state.visa[propertyToUpdate] = status;
      }
    },
    setReceipt: (state, action) => {
      const { receipt, index } = action.payload;
      const receiptProperties = [
        "optFeedback",
        "eadFeedback",
        "i983Feedback",
        "i20Feedback",
      ];
      if (index < receiptProperties.length) {
        const receiptToUpdate = receiptProperties[index];
        state.visa[receiptToUpdate] = receipt;
      }
    },
    loadUser: (state, action) => {
      state = action.payload.user;
      return state;
    },
    updateUserId: (state, action) => {
      state.userId = action.payload.userId;
      return state;
    },
    updateFile: (state, action) => {
      const name = action.payload.name;
      if (state.files[fileName[name]].length !== 0)
        state.files[fileName[name]] = [];
      state.files[fileName[name]].push(action.payload.fileInfo);
      return state;
    },
    removeFile: (state, action) => {
      const name = action.payload.name;
      state.files[fileName[name]] = [];
      return state;
    },
    updateDriverLicense: (state, action) => {
      state.info.driverLicense = action.payload.driverLicense;
      return state;
    },

    updateUsCitizen: (state, action) => {
      state.info.usCitizen = action.payload.usCitizen;
      return state;
    },
    updateApplicationStatus: (state, action) => {
      state.applicationStatus = action.payload.applicationStatus;
      return state;
    },
    updateVisaStatus: (state, action) => {
      state.visaStatus = action.payload.visaStatus;
    },
    updateOnboardFeedback: (state, action) => {
      state.onboardFeedback = action.payload.onboardFeedback;
      return state;
    },
    fillInfo: (state, action) => {
      state.info = action.payload.info;
      state.applicationStatus = action.payload.applicationStatus;

      return state;
    },
  },
});

export const {
  loadUser,
  updateUserId,
  updateFile,
  removeFile,
  updateDriverLicense,
  updateUsCitizen,
  updateApplicationStatus,
  updateVisaStatus,
  updateOnboardFeedback,
  fillInfo,
  setReceipt,
  setVisa,
} = userSlice.actions;
export default userSlice.reducer;
