import mongoose from "mongoose";
import process from "process";
import dotenv from "dotenv";
import multer from "multer";
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

// handle file upload
import path from "path";
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/resources");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
// const fileUPload = upload.fields([{ name: "file", maxCount: 1 }]);

app.post("/api/upload", upload.single("file"), (req, res, next) => {
  console.log("ok");
  console.log(req.file.filename);
  res.json({ fileUrl: `http://127.0.0.1:4000/resources/${req.file.filename}` });
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
