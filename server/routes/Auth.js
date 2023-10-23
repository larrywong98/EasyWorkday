import express from "express";
import { Auth, Register, User } from "../models/schema.js";
import jwt from "jsonwebtoken";
import { auth } from "../utils/auth.js";
import md5 from "md5";

const router = express.Router();

router.get("/regtoken/all", async (req, res) => {
  try {
    const response = await Register.find();
    res.json({ status: "ok", regToken: response });
  } catch (err) {
    res.json({ status: err.message });
  }
});
router.post("/regtoken", async (req, res) => {
  try {
    const { email, fullName } = req.body;
    const payload = {
      user: {
        email: email,
      },
    };
    // generate registration token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "180m",
    });

    const user = await User.findOne({ info: { email: email } });
    // const regStatus = user.applicationStatus;

    let filter = { email: email };
    let update = { fullName: fullName, regToken: token, regStatus: "initial" };
    // save to register history
    const response = await Register.findOneAndUpdate(filter, update, {
      upsert: true,
      new: true,
    });

    res.json({ status: "ok", token: token });
  } catch (err) {
    res.json({ status: err.message });
  }
});

// router.get("/checkexp", auth, (req, res) => {
//   if (Date.now() <= req.exp) {
//     res.json({ status: "valid" });
//   } else {
//     res.json({ status: "expired" });
//   }
// });

router.post("/token", async (req, res) => {
  try {
    const { name, pwd } = req.body;
    const user = await Auth.findOne({ email: name, password: pwd });
    if (!user) {
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

router.post("/signin", auth, async (req, res) => {
  try {
    const userInfo = await Auth.findOne(
      { email: req.user.name },
      { password: false }
    );
    // console.log(`/signin: ${userInfo}`);
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
    // new user
    const newUser = Auth({
      userId: newUserId,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.pwd,
      role: "emp",
    });

    // new user application
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
        email: req.body.email,
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
    // console.log(newinfo);
    const success = await newUser.save();
    if (!success) res.json({ status: "create failed" });
    res.json({ status: "ok" });
  } catch (err) {
    // console.log(err.message);
    res.json({ status: err.message });
  }
});

export default router;
