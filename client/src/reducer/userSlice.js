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
    // role: "emp",
    applicationStatus: status.initial,
    visaStatus: status.initial,
    onboardFeedback: "",

    info: {
      // section 1
      firstName: "",
      lastName: "",
      middleName: "",
      preferredName: "",
      ssn: "",
      dob: "",
      gender: "",

      // section 2
      address: "",

      // section 3
      cellPhoneNumber: "",
      workPhoneNumber: "",
      email: "",

      // section 4
      usCitizen: "",
      visaTitle: "",
      visaDate: ["", ""],

      // section 5
      reference: [
        {
          firstName: "",
          lastName: "",
          middleName: "",
          preferredName: "",
          phone: "",
          email: "",
          relationship: "",
        },
      ],
      emergency: [
        {
          firstName: "",
          lastName: "",
          middleName: "",
          preferredName: "",
          phone: "",
          email: "",
          relationship: "",
        },
      ],
    },

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

    // profilePicture, driverLicense, workAuthorization, optReceipt, optEad, i983, i20
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
    updateVisaOptReceipt: (state, action) => {
      state.visa.optStatus = action.payload.status;
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
    discardFiles: (state, action) => {
      state.files = action.payload.files;
      return state;
    },
  },
});

export const {
  loadUser,
  updateUserId,
  updateApplicationStatus,
  updateFile,
  removeFile,
  updateDriverLicense,
  updateOnboardFeedback,
  updateVisaStatus,
  updateVisaOptReceipt,
  fillInfo,
  discardFiles,
  setReceipt,
  setVisa,
} = userSlice.actions;
export default userSlice.reducer;
