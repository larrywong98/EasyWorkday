import express from "express";
import { Auth, Incoming, Register, User } from "../models/schema.js";
import jwt from "jsonwebtoken";
import { auth } from "../utils/auth.js";
import md5 from "md5";
import bcrypt from "bcrypt";

const router = express.Router();

router.put("/", async (req, res) => {
  try {
    const filter = { userId: req.body.userId };
    let user = await User.findOne(filter);
    let newFiles = user.files;
    newFiles[req.body.index] = req.body.fileInfo;
    let newVisa = user.visa;
    if (req.body.index === 3) {
      newVisa.optStatus = "pending";
    } else if (req.body.index === 4) {
      newVisa.eadStatus = "pending";
    } else if (req.body.index === 5) {
      newVisa.i983Status = "pending";
    } else if (req.body.index === 6) {
      newVisa.i20Status = "pending";
    }
    const update = { files: newFiles, visa: newVisa };
    const response = await User.findOneAndUpdate(filter, update);

    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: err.message });
  }
});

router.post("/token", async (req, res) => {
  try {
    const { name, pwd } = req.body;

    const user = await Auth.findOne({ email: name });
    const authorized = await bcrypt.compare(pwd, user.password);
    if (!authorized) {
      res.json({ status: "unauthorized" });
      return;
    }
    const payload = {
      user: {
        id: user.userId,
        name: user.email,
        password: user.password,
        admin: user.admin,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.json({ status: "ok", name: name, token: token });
  } catch (err) {
    res.json({ status: err.message });
  }
});

// get all employee visa information
router.get("/all", async (req, res) => {
  const query = {
    "info.visaTitle": "F1(CPT/OPT)",
    applicationStatus: "approved",
  };
  const result = await User.find(query, { _id: false });
  console.log(result);
  res.json({ status: result });
});

// get inprogress employee visa information
router.get("/inprogress", async (req, res) => {
  // Setting up the query to filter out documents where ["visa.i20Feedback"] is "approved"
  const query = {
    "visa.i20Status": { $ne: "approved" },
    "info.visaTitle": "F1(CPT/OPT)",
    applicationStatus: "approved",
  };

  // Executing the find query with the filter applied
  const result = await User.find(query, { _id: false });
  console.log(result);
  res.json({ status: result });
});

export default router;
