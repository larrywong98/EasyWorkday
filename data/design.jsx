const test = () => {
  // if token expires delete from
  const token = [
    {
      jwt: "jwttoken",
    },
  ];
  const profile = {
    userId: "md5",
    role: "hr",
    // assignedBy: "userId",
    applicationStatus: "pending approved rejected",

    // section 1
    firstName: "Xiaoyun",
    lastName: "Wang",
    middleName: "",
    preferredName: "larry",
    profilePic: "url", // static file on server
    ssn: "000-00-0000", // hide show
    dob: new Date("2000-01-01"), // date component
    gender: "I do not wish to answer",

    // section 2
    currentAddress: "building apt street city state zip",

    // section 3
    cellPhoneNumber: "000-000-0000",
    workPhoneNumber: "000-000-0000",
    email: "xxx@gmail.com",

    // section 4
    visaTitle: "F1",
    startDate: new Date(),
    endDate: new Date(),

    // section 5
    emergency: {
      firstName: "",
      lastName: "",
      middleName: "",
      phone: "",
      email: "",
      relationship: "",
    },

    usCitizen: "Green Card or Citizen",

    optReceipt: "url", // static file on server
    optEad: "url",
    i983: "url",
    i20: "",
    other: {
      other1: "url",
      other2: "url",
    },

    reference: {
      firstName: "",
      lastName: "",
      middleName: "",
      phone: "",
      email: "",
      relationship: "",
    },

    createDate: new Date(),
    lastUpdateDate: new Date(),
    deleteDate: new Date(),
  };

  // {
  //   Yes: "Green Card or Citizen",
  //   No: {
  //     // a: "H1-B, L2, F1(CPT/OPT), H4, Other",
  //     // b: "F1(CPT/OPT): show an input field for uploading their OPT Receipt",
  //     // c: "other show an input box to specify the visa title",

  //   },
  // },

  return <>{profile}</>;
};
export default test;
