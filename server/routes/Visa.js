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
    const update = { files: newFiles };
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

export default router;
