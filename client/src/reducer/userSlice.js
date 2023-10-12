import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "md5",
    role: "emp",
    applicationStatus: "pending approved rejected",

    data: {},
    // info
    address: "",
    cellPhoneNumber: "",
    dob: "",
    driverLicense: {
      uid: "",
      name: "",
      status: "",
      url: "",
    },
    email: "",
    // emailEr: "",
    // emailRef: ",",
    firstName: "",
    // firstNameEr: "",
    // firstNameRef: "",
    gender: "",
    lastName: "",
    // lastNameEr: "",
    // lastNameRef: "",
    middleName: "",
    // middleNameEr: "",
    // middleNameRef: "",
    // phoneEr: "",
    // phoneRef: "",
    preferredName: "",
    profilePic: {
      uid: "",
      name: "",
      status: "",
      url: "",
    },
    // relationshipEr: "",
    // relationshipRef: "",
    ssn: "",
    usCitizen: "",
    visaDate: "",
    visaTitle: "",
    workPhoneNumber: "",
    reference: [],
    emergency: [],

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
      state.profilePic = action.payload.profilePic;
      return state;
    },
    updateDriverLicense: (state, action) => {
      state.driverLicense = action.payload.driverLicense;
      return state;
    },
    fillInfo: (state, action) => {
      console.log(action.payload);
      state.data = action.payload.data;
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

export const { loadUser, updateProfilePic, updateDriverLicense, fillInfo } =
  userSlice.actions;
export default userSlice.reducer;
