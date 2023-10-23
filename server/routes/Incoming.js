import express from "express";
import { Incoming } from "../models/schema.js";

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    let filter1 = { email: req.body.email };
    let update1 = { fullName: req.body.fullName, email: req.body.email };
    // save to incoming
    const response1 = await Incoming.findOneAndUpdate(filter1, update1, {
      upsert: true,
      new: true,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await Incoming.find();
    res.json({ status: "ok", incoming: response });
  } catch (err) {
    res.json({ status: "error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    console.log(req.body.email);
    let filter = { email: req.body.email };
    const response = await Incoming.findOneAndDelete(filter);
    console.log(response);
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

export default router;
