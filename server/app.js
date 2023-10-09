import mongoose from "mongoose";
import process from "process";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_PWD}@cluster0.yyafoyf.mongodb.net/chuwa?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json("Home page");
});

// import userRoute from "./routes/User.js";
// import productRoute from "./routes/Product.js";
// import cartRoute from "./routes/Cart.js";

// app.use("/api/user", userRoute);
// app.use("/api/product", productRoute);
// app.use("/api/cart", cartRoute);

app.listen(4000, () => {
  console.log("Server running on 4000!");
});
