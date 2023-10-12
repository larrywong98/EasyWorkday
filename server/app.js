import mongoose from "mongoose";
import process from "process";
import dotenv from "dotenv";
dotenv.config();

// yingshan's mongoDB
const uri = `mongodb+srv://${process.env.MDB_NAME}:${process.env.MDB_PWD}@cluster0.0kmc57i.mongodb.net/?retryWrites=true&w=majority`;
// larry's mongoDB:
// const uri = `mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_PWD}@cluster0.yyafoyf.mongodb.net/chuwa?retryWrites=true&w=majority`

mongoose
  .connect(uri)
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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// import userRoute from "./routes/User.js";
// import productRoute from "./routes/Product.js";
// import cartRoute from "./routes/Cart.js";

// app.use("/api/user", userRoute);
// app.use("/api/product", productRoute);
// app.use("/api/cart", cartRoute);

const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.info(`Server is up on http://localhost:${port}`)
);
