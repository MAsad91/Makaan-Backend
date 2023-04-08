const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    req.adminData = { adminId: decodedToken.adminId };
    next();
  } catch (err) {
    return next(new HttpError("Authentication is failed", 401));
  }
};
