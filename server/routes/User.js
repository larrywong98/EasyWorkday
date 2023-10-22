import express from "express";
import { User } from "../models/schema.js";

const router = express.Router();
// save employee information
router.post("/save/:userId", async (req, res) => {
  let filter = { userId: req.params.userId };
  let update = {
    role: req.body.role,
    applicationStatus: req.body.applicationStatus,
    onboardFeedback: req.body.onboardFeedback,
    info: req.body.info,
    visa: req.body.visa,
    files: req.body.files,
    createDate: req.body.createDate,
    lastUpdateDate: req.body.lastUpdateDate,
    deleteDate: req.body.deleteDate,
  };

  try {
    const result = await User.findOneAndUpdate(filter, update, {
      upsert: true,
      new: true,
    });
    console.log(result);
    res.json({ status: result });
  } catch (err) {
    res.json({ status: "error" });
  }
});

// get all employee information
router.get("/all", async (req, res) => {
  const result = await User.find({}, { _id: false });
  res.json({ status: result });
});

// get one employee information
router.get("/:userId", async (req, res) => {
  try {
    const result = await User.findOne(
      { userId: req.params.userId },
      { _id: false }
    );
    console.log(result);
    res.json({ status: result });
  } catch (err) {
    res.json({ status: "error" });
  }
});

// update employee application status
router.post("/appstatus/:userId", async (req, res) => {
  let filter = { userId: req.params.userId };
  let update = {
    applicationStatus: req.body.decision,
    onboardFeedback: req.body.reason,
  };
  try {
    const response = await User.findOneAndUpdate(filter, update);
    res.json({ status: response });
  } catch (err) {
    res.json({ status: "error" });
  }
});

// update feedback & visa status
router.post("/visastatus/:userId", async (req, res) => {
  let filter = { userId: req.params.userId };
  const { visa, status, receipt, feedback } = req.body;
  let update = {
    [`visa.${visa}`]: status,
    [`visa.${receipt}`]: feedback,
  };
  console.log(update);
  try {
    const response = await User.findOneAndUpdate(filter, update);
    res.json({ status: response });
  } catch (err) {
    res.json({ status: "error" });
  }
});

export default router;
