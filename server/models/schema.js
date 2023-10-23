import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    userId: String,
    role: String,
    applicationStatus: String,
    onboardFeedback: String,
    info: {
      firstName: String,
      lastName: String,
      middleName: String,
      preferredName: String,
      ssn: String,
      dob: String,
      gender: String,
      address: String,
      cellPhoneNumber: String,
      workPhoneNumber: String,
      email: String,
      usCitizen: String,
      visaTitle: String,
      visaDate: [String],
      reference: [
        {
          firstName: String,
          lastName: String,
          middleName: String,
          preferredName: String,
          phone: String,
          email: String,
          relationship: String,
        },
      ],
      emergency: [
        {
          firstName: String,
          lastName: String,
          middleName: String,
          preferredName: String,
          phone: String,
          email: String,
          relationship: String,
        },
      ],
    },
    visa: {
      cur: Number,
      optStatus: String,
      optFeedback: String,
      eadStatus: String,
      eadFeedback: String,
      i983Status: String,
      i983Feedback: String,
      i20Status: String,
      i20Feedback: String,
    },
    files: [
      [
        {
          name: String,
          status: String,
          url: String,
        },
      ],
    ],
    createDate: String,
    lastUpdateDate: String,
    deleteDate: String,
  },
  {
    collection: "User",
  }
);

const authSchema = new Schema(
  {
    userId: String,
    userName: String,
    email: String,
    password: String,
    role: String,
  },
  {
    collection: "Auth",
  }
);

const registerSchema = new Schema(
  {
    fullName: String,
    email: String,
    regToken: String,
    regStatus: String,
  },
  {
    collection: "Register",
  }
);

const incomingSchema = new Schema(
  {
    fullName: String,
    email: String,
  },
  {
    collection: "Incoming",
  }
);

const User = mongoose.model("User", userSchema);
const Auth = mongoose.model("Auth", authSchema);
const Register = mongoose.model("Register", registerSchema);
const Incoming = mongoose.model("Incoming", incomingSchema);

export { User, Auth, Register, Incoming };
