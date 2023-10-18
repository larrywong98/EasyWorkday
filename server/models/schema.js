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
const User = mongoose.model("User", userSchema);
const Auth = mongoose.model("Auth", authSchema);

export { User, Auth };

// const { Schema } = mongoose;
// const productSchema = new Schema(
//   {
//     id: String,
//     imgPath: String,
//     volume: Number,
//     category: String,
//     desp: String,
//     price: Number,
//     content: String,
//     timestamp: String,
//   },
//   {
//     collection: "Product",
//   }
// );

// const cartSchema = new Schema(
//   {
//     userId: String,
//     addedProducts: [{ id: String, added: Number }],
//   },
//   {
//     collection: "Cart",
//   }
// );
// );

// const Product = mongoose.model("Product", productSchema);
// const Cart = mongoose.model("Cart", cartSchema);
// const User = mongoose.model("User", userSchema);

// export { Product, Cart, User };
