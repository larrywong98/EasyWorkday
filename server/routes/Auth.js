import express from "express";
import { Auth, User } from "../models/schema.js";
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
    console.log(req.body);
    const { name, pwd } = req.body;
    //bug
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
    console.log(userInfo);
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
    const newUserId = md5(Date.now());
    const newUser = Auth({
      userId: newUserId,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.pwd,
      role: "emp",
    });
    const newUserInfo = User({
      userId: newUserId,
      applicationStatus: "0",
      visaStatus: "",
      onboardFeedback: "",
      info: {
        firstName: "",
        lastName: "",
        middleName: "",
        preferredName: "",
        ssn: "",
        dob: "",
        gender: "",
        address: "",
        cellPhoneNumber: "",
        workPhoneNumber: "",
        email: "",
        usCitizen: "",
        visaTitle: "",
        visaDate: ["", ""],
        reference: [
          {
            firstName: "",
            lastName: "",
            middleName: "",
            preferredName: "",
            phone: "",
            email: "",
            relationship: "",
          },
        ],
        emergency: [
          {
            firstName: "",
            lastName: "",
            middleName: "",
            preferredName: "",
            phone: "",
            email: "",
            relationship: "",
          },
        ],
      },
      visa: {
        cur: 0,
        optStatus: "",
        optFeedback: "",

        eadStatus: "",
        eadFeedback: "",

        i983Status: "",
        i983Feedback: "",

        i20Status: "",
        i20Feedback: "",
      },
      files: [[], [], [], [], [], [], []],
      createDate: "",
      lastUpdateDate: "",
      deleteDate: "",
    });
    const newinfo = await newUserInfo.save();
    console.log(newinfo);
    const success = await newUser.save();
    if (!success) res.json({ status: "create failed" });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err.message);
    res.json({ status: err.message });
  }
});

export default router;
