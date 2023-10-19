import { createSlice } from "@reduxjs/toolkit";
import {
  fileName,
  status,
  statusProperties,
  receiptProperties,
} from "./global";

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
      cur: 0,
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
      if (state.visa.cur > 3) {
        return;
      }
      // Update the status property in the visa object using the index
      const propertyToUpdate = statusProperties[index];
      state.visa[propertyToUpdate] = status;

      if (status === "approved") {
        state.visa.cur++;
      }
    },
    setReceipt: (state, action) => {
      const { receipt, index } = action.payload;
      const receiptToUpdate = receiptProperties[index];
      if (!receiptToUpdate) {
        return;
      }
      state.visa[receiptToUpdate] = receipt;
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
    updateVisaTitle: (state, action) => {
      state.info.visaTitle = action.payload.visaTitle;
      return state;
    },
    fillInfo: (state, action) => {
      state.info = action.payload.info;
      state.applicationStatus = action.payload.applicationStatus;

      return state;
    },
    discardFiles: (state, action) => {
      state.files = action.payload.files;
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
  updateVisaTitle,
  fillInfo,
  discardFiles,
  setReceipt,
  setVisa,
} = userSlice.actions;
export default userSlice.reducer;
