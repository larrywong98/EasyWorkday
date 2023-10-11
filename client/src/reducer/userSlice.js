import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "md5",
    role: "emp",
    applicationStatus: "pending approved rejected",

    // info
    address: "",
    cellPhoneNumber: "",
    dob: "",
    email: "",
    emailEr: "",
    emailRef: ",",
    firstName: "",
    firstNameEr: "",
    firstNameRef: "",
    gender: "",
    lastName: "",
    lastNameEr: "",
    lastNameRef: "",
    middleName: "",
    middleNameEr: "",
    middleNameRef: "",
    phoneEr: "",
    phoneRef: "",
    preferredName: "",
    profilePic: "",
    relationshipEr: "",
    relationshipRef: "",
    ssn: "",
    usCitizen: "",
    visaDate: "",
    visaTitle: "",
    workPhoneNumber: "",

    // dates
    createDate: "",
    lastUpdateDate: "",
    deleteDate: "",
  },
  reducers: {
    loadUser: (state) => {
      return state;
    },
  },
});

export const { loadUser } = userSlice.actions;
export default userSlice.reducer;
