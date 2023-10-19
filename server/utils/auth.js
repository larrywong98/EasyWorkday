import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization?.match(/^Bearer (.+)/)[1];
  if (!token) {
    return res.json({ status: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.json({ status: "unauthorized" });
  }
};

export { auth };
