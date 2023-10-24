import mongoose from "mongoose";
import process from "process";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { User } from "./models/schema.js";

dotenv.config();

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 4000;

// yingshan's mongoDB
// const uri = `mongodb+srv://${process.env.MDB_NAME}:${process.env.MDB_PWD}@workday.aicingq.mongodb.net/?retryWrites=true&w=majority`;

const uri = `mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_PWD}@cluster0.yyafoyf.mongodb.net/workday?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRoute from "./routes/User.js";
import authRoute from "./routes/Auth.js";
import incomingRoute from "./routes/Incoming.js";
import visaRoute from "./routes/Visa.js";

app.use("/api/auth", authRoute);
app.use("/api/emp", userRoute);
app.use("/api/incoming", incomingRoute);
app.use("/api/visa/", visaRoute);

app.listen(port, () =>
  console.info(`Server is up on http://localhost:${port}`)
);
