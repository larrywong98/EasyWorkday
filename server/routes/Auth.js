import express from "express";
import { Auth } from "../models/schema.js";
import jwt from "jsonwebtoken";
import { auth } from "../utils/auth.js";
import md5 from "md5";

const router = express.Router();

// router.put("/reset", async (req, res) => {
//   try {
//     let filter = { userName: req.body.username };
//     let update = { password: req.body.password };
//     const response = await User.findOneAndUpdate(filter, update);
//     if (response) {
//       res.json({ status: "ok" });
//     } else {
//       res.json({ status: "not ok" });
//     }
//   } catch (err) {
//     res.json({ status: "not ok" });
//   }
// });

router.post("/token", async (req, res) => {
  try {
    const { name, pwd } = req.body;
    const user = await Auth.findOne({ userName: name, password: pwd });
    if (!user) {
      res.json({ status: "unauthorized" });
      return;
    }
    const payload = {
      user: {
        id: user.userId,
        name: user.userName,
        password: user.password,
        admin: user.admin,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.json({ status: "ok", name: name, token: token });
  } catch (err) {
    res.json({ status: err.message });
  }
});

router.post("/signin", auth, async (req, res) => {
  try {
    const userInfo = await Auth.findOne(
      { email: req.user.name },
      { password: false }
    );

    res.json({ status: userInfo });
  } catch (err) {
    res.json({ status: "error" });
  }
});
router.post("/signup", async (req, res) => {
  try {
    const exist = await Auth.findOne({ email: req.body.email });
    if (exist) {
      res.json({ status: "exist" });
      return;
    }

    const newUser = Auth({
      userId: md5(Date.now()),
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.pwd,
      role: "emp",
    });
    const success = await newUser.save();
    if (!success) res.json({ status: "create failed" });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err.message);
    res.json({ status: err.message });
  }
});

export default router;