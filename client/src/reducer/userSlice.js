import { createSlice } from "@reduxjs/toolkit";
import { fileName, status } from "./global";

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
