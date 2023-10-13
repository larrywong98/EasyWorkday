import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { status } from "./global";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "md5",
    role: "emp",
    applicationStatus: status.initial,
    onboardFeedback: "",

    data: {
      firstName: "Xiaoyun",
      lastName: "Wang",
      middleName: "middle",
      preferredName: "larry",
      profilePic: {
        uid: "1",
        name: "ProfileUrl.png",
        status: "done",
        url: "",
      },
      ssn: "000000000", // hide show

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
      // startDate: "2015/01/01",
      // endDate: "2015/01/02",
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
      driverLicense: {
        uid: "",
        name: "",
        status: "",
        url: "",
      },

      optReceipt: {
        uid: "",
        name: "",
        status: "",
        url: "",
      },
      optReceiptFeedback: "",
      optEad: {
        uid: "",
        name: "",
        status: "",
        url: "",
      },
      optEadFeedback: "",
      i983: {
        uid: "",
        name: "",
        status: "",
        url: "",
      },
      i983Feedback: "",
      i20: {
        uid: "",
        name: "",
        status: "",
        url: "",
      },
      i20Feedback: "",
    },

    // info
    // address: "",
    // cellPhoneNumber: "",
    // dob: "",
    // driverLicense: {
    //   uid: "",
    //   name: "",
    //   status: "",
    //   url: "",
    // },
    // email: "",
    // // emailEr: "",
    // // emailRef: ",",
    // firstName: "",
    // // firstNameEr: "",
    // // firstNameRef: "",
    // gender: "",
    // lastName: "",
    // // lastNameEr: "",
    // // lastNameRef: "",
    // middleName: "",
    // // middleNameEr: "",
    // // middleNameRef: "",
    // // phoneEr: "",
    // // phoneRef: "",
    // preferredName: "",
    // profilePic: {
    //   uid: "",
    //   name: "",
    //   status: "",
    //   url: "",
    // },
    // // relationshipEr: "",
    // // relationshipRef: "",
    // ssn: "",
    // usCitizen: "",
    // visaDate: "",
    // visaTitle: "",
    // workPhoneNumber: "",
    // reference: [],
    // emergency: [],

    // dates
    createDate: "",
    lastUpdateDate: "",
    deleteDate: "",
  },
  reducers: {
    loadUser: (state) => {
      return state;
    },
    updateProfilePic: (state, action) => {
      state.data.profilePic = action.payload.profilePic;
      return state;
    },
    updateDriverLicense: (state, action) => {
      state.data.driverLicense = action.payload.driverLicense;
      return state;
    },

    updateUsCitizen: (state, action) => {
      state.data.usCitizen = action.payload.usCitizen;
      return state;
    },
    updateApplicationStatus: (state, action) => {
      state.applicationStatus = action.payload.applicationStatus;
      return state;
    },
    updateOnboardFeedback: (state, action) => {
      state.onboardFeedback = action.payload.onboardFeedback;
      return state;
    },
    fillInfo: (state, action) => {
      console.log(action.payload.data);
      state.data = action.payload.data;
      state.applicationStatus = action.payload.applicationStatus;
      // state.address = action.payload.address;
      // state.cellPhoneNumber = action.payload.cellPhoneNumber;
      // //  state.dob=action.payload.dob;
      // state.email = action.payload.email;
      // state.emailEr = action.payload.emailEr;
      // state.emailRef = action.payload.emailRef;
      // state.firstName = action.payload.firstName;
      // //  state.firstNameEr=action.payload.firstNameEr;
      // state.firstNameRef = action.payload.firstNameRef;
      // state.gender = action.payload.gender;
      // state.lastName = action.payload.lastName;
      // //  state.lastNameEr=action.payload.lastNameEr;
      // state.lastNameRef = action.payload.lastNameRef;
      // state.middleName = action.payload.middleName;
      // //  state.=action.payload.middleNameEr;
      // state.middleNameRef = action.payload.middleNameRef;
      // //  state.phoneEr=action.payload.phoneEr;
      // state.phoneRef = action.payload.phoneRef;
      // state.preferredName = action.payload.preferredName;
      // //  state.relationshipEr=action.payload.relationshipEr;
      // state.relationshipRef = action.payload.relationshipRef;
      // state.ssn = action.payload.ssn;
      // state.usCitizen = action.payload.usCitizen;
      // state.visaDate = action.payload.visaDate;
      // state.visaTitle = action.payload.visaTitle;
      // state.workPhoneNumber = action.payload.workPhoneNumber;
      // state.emergency = action.payload.emergency;

      return state;
    },
  },
});

export const {
  loadUser,
  updateProfilePic,
  updateDriverLicense,
  updateUsCitizen,
  updateApplicationStatus,
  updateOnboardFeedback,
  fillInfo,
} = userSlice.actions;
export default userSlice.reducer;
