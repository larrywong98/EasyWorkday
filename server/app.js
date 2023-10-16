import mongoose from "mongoose";
import process from "process";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 4000;

// yingshan's mongoDB
const uri = `mongodb+srv://${process.env.MDB_NAME}:${process.env.MDB_PWD}@cluster0.0kmc57i.mongodb.net/?retryWrites=true&w=majority`;

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
// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Define the storage and file upload settings for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Use path.join to construct the directory path
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.json("Home page");
});

// Define a route for handling file uploads
app.post("/api/upload", upload.single("file"), (req, res) => {
  // The uploaded file can be accessed via req.file
  const uploadedFile = req.file;
  if (!uploadedFile) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const fileInfo = {
    filename: uploadedFile.filename,
    originalname: uploadedFile.originalname,
    size: uploadedFile.size,
    mimetype: uploadedFile.mimetype,
  };

  const BASE_URL = `http://localhost:${port}`;
  // Generate the URL for the uploaded file
  const fileUrl = `${BASE_URL}/uploads/${uploadedFile.filename}`;

  res.json({
    message: "File uploaded successfully",
    fileInfo,
    pdfUrl: fileUrl,
  });
});

app.listen(port, () =>
  console.info(`Server is up on http://localhost:${port}`)
);
