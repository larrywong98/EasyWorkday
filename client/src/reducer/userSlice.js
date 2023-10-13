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

    info: {
      firstName: "Xiaoyun",
      lastName: "Wang",
      middleName: "middle",
      preferredName: "larry",

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
      profilePicture: {},
      driverLicense: {},
      workAuthorization: {},
    },
    // const user = useselector (state=>  state.userReducer)
    // user.visa
    visa: {
      optReceipt: {},
      optStatus: "",
      optReceiptFeedback: "",
      optEad: {},
      optEadStatus: "",
      optEadFeedback: "",
      i983: {},
      i983Status: "",
      i983Feedback: "",
      i20: {},
      i20Status: "",
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
    updateFile: (state, action) => {
      // state.info.profilePic = action.payload.profilePic;
      // console.log(action.payload);
      switch (action.payload.fileInfo.name) {
        case "ProfilePicture":
          state.info.profilePicture = action.payload.fileInfo;
          break;
        case "DriverLicense":
          state.info.driverLicense = action.payload.fileInfo;
          break;
        case "WorkAuthorization":
          state.info.workAuthorization = action.payload.fileInfo;
          break;
        case "OptReceipt":
          state.visa.optReceipt = action.payload.fileInfo;
          break;
        case "OptEad":
          state.visa.optEad = action.payload.fileInfo;
          break;
        case "I983":
          state.visa.i983 = action.payload.fileInfo;
          break;
        case "I20":
          state.visa.i20 = action.payload.fileInfo;
          break;
        default:
          break;
      }
      return state;
    },
    removeFile: (state, action) => {
      // console.log(action.payload);
      switch (action.payload.fileName) {
        case "ProfilePicture":
          state.info.profilePicture = {};
          break;
        case "DriverLicense":
          state.info.driverLicense = {};
          break;
        case "WorkAuthorization":
          state.info.workAuthorization = {};
          break;
        case "OptReceipt":
          state.visa.optReceipt = {};
          break;
        case "OptEad":
          state.visa.optEad = {};
          break;
        case "I983":
          state.visa.i983 = {};
          break;
        case "I20":
          state.visa.i20 = {};
          break;
        default:
          break;
      }
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
    updateOnboardFeedback: (state, action) => {
      state.onboardFeedback = action.payload.onboardFeedback;
      return state;
    },
    fillInfo: (state, action) => {
      state.info = action.payload.info;
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
  updateFile,
  removeFile,
  updateDriverLicense,
  updateUsCitizen,
  updateApplicationStatus,
  updateOnboardFeedback,
  fillInfo,
} = userSlice.actions;
export default userSlice.reducer;
