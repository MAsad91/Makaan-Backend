const express = require("express");
const { check } = require("express-validator");

const authControllers = require("../controllers/auth-controllers");

const router = express.Router();

//verification of email
// router.get("/:id/verify/:token", authControllers.verificationEmail);

//user login
router.post("/login", authControllers.login);

//email send for password reset
// router.post("/emailsend", authControllers.emailSend);

//change password request
// router.post("/changepassword", authControllers.changePassword);

//user signup
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("phoneno").not().isEmpty(),
    check("password").not().isEmpty()
  ],
  authControllers.signUp
);

module.exports = router;