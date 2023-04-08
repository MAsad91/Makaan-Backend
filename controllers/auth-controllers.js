const HttpError = require("../models/http-error");
const User = require("../models/auth");
// const Admin = require("../models/admin");
// const UserVerification = require("../models/userVerification");
// const EmailUpdateVerification = require("../models/emailVerification");
// const Otp = require("../models/otp");
const { validationResult } = require("express-validator");
// const {
//   sendWelcomeEmail,
//   sendVerificationEmail,
//   sendOtpEmail,
// } = require("../emails/account");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");


//user login
const login = async (req, res, next) => {
  const { phoneno, password } = req.body;
  let existingUser;
  try {
    console.log(existingUser)
    existingUser = await User.findOne({ phoneno: phoneno });
    console.log(existingUser, 1)
    
  } catch (err) {
    return next(new HttpError("Logging in is failed,Please try again!", 500));
  }

  if (!existingUser) {
    return next(new HttpError("Invalid credentials, User not exit!", 401));
  }
  

  let isValidPassword;
  // try {
  //   if(password === existingUser.password) {
  //     isValidPassword=true; 
  //   }
  // } catch (err) {
  //   return next(new HttpError("Could not log you in, please try again", 500));
  // }
  // if (!isValidPassword) {
  //     return next(new HttpError("Invalid credentials,Please try again!", 401));
  //   }

  //   res.send();

  // }
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(new HttpError("Could not log you in, please try again", 500));
  }

  if (!isValidPassword) {
    return next(new HttpError("Invalid credentials,Please try again!", 401));
  }
  res.send();
}

  // if (!existingUser.verified) {
  //   let verificationToken = await UserVerification.findOne({
  //     userId: existingUser._id,
  //   });
  //   if (!verificationToken) {
  //     verificationToken = await new UserVerification({
  //       userId: existingUser._id,
  //       token: crypto.randomBytes(32).toString("hex"),
  //     }).save();
  //     const url = `https://safecityservices.netlify.app/${existingUser.id}/verify/${verificationToken.token}`;
  //     sendVerificationEmail(existingUser.email, "Verify Your Email", url);
  //   }

  //   return next(
  //     new HttpError("An Email sent to your account please verify", 400)
  //   );
  // }

  // if (!existingUser.verified) {
  //   let emailToken = await EmailUpdateVerification.findOne({
  //     userId: existingUser._id,
  //   });
  //   if (!emailToken) {
  //     emailToken = await new EmailUpdateVerification({
  //       userId: existingUser._id,
  //       token: crypto.randomBytes(32).toString("hex"),
  //     }).save();
  //     const url = `https://safecityservices.netlify.app/${existingUser.id}/updateemailverify/${emailToken.token}`;
  //     sendVerificationEmail(existingUser.email, "Verify Your Email", url);
  //   }

  //   return next(
  //     new HttpError("An Email sent to your account please verify", 400)
  //   );
  // }

//   let token;
//   try {
//     token = jwt.sign(
//       {
//         userId: existingUser.id,
//         email: existingUser.email,
//         token: token,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1h",
//       }
//     );
//   } catch (err) {
//     return next(
//       new HttpError(new HttpError("Logging in is failed,please try again", 500))
//     );
//   }

//   res.json({
//     userId: existingUser.id,
//     email: existingUser.email,
//     token: token,
//   });
// };

//user signup
const signUp = async (req, res, next) => {
  
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(
  //     new HttpError("Input data is invalid.Please check your data!", 422)
  //   );
  // }

  const { name, phoneno, password } = req.body;
  
  let existingUser;
  // , existingAdmin;
  try {
    existingUser = await User.findOne({ phoneno: phoneno });
    // existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Signing Up is failed,Please try again!", 500));
  }
  if (existingUser) {
    return next(new HttpError("User exits already,Please login instead!", 422));
  }

  // if (existingAdmin) {
  //   return next(
  //     new HttpError(
  //       "You cannot use this email because this email belongs to someone"
  //     )
  //   );
  // }

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(
      new HttpError("Could not create a user, please try again.", 500)
    );
  }

  const userData = new User({
    name,
    phoneno,
    password: hashPassword,
    // password,
    // property: [],
   
  });
  console.log(name, phoneno, password);
  
  console.log("signup1");
  let user;
  console.log("signup2");
  try {
    console.log("signup3");
    console.log(userData);
    
    user = await userData.save();
    console.log(user);
    
    
    console.log("signup4");
    res.send();
    // sendWelcomeEmail(userData.phoneno, userData.name);
  } catch (err) {
    return next(new HttpError("Creating user is failed. Please try again!"));
  }

  // let verificationToken;
  // try {
  //   verificationToken = await new UserVerification({
  //     userId: userData._id,
  //     token: crypto.randomBytes(32).toString("hex"),
  //   }).save();
  // } catch (err) {
  //   return next(
  //     new HttpError("Could not save verification token. Please try again!", 500)
  //   );
  // }

  // const url = `https://safecityservices.netlify.app/${userData.id}/verify/${verificationToken.token}`;
  // sendVerificationEmail(userData.email, "Verify Your Email", url);

  // let token;
  // try {
  //   token = jwt.sign(
  //     { userId: createdUser.id, email: createdUser.email },
  //     process.env.JWT_SECRET,
  //     {
  //       expiresIn: "1h",
  //     }
  //   );
  // } catch (err) {
  //   return next(new HttpError("Signing up is failed,please try again.", 500));
  // }

  // res.status(201).json({
  //   userId: createdUser.id,
  //   email: createdUser.email,
  //   token: token,
  //   message: "An Email sent to your account please verify",
  // });
};

//First time verification email
// const verificationEmail = async (req, res, next) => {
//   const id = req.params.id;
//   const Verificationtoken = req.params.token;
//   console.log(`ID   ${id}     
//   TOKEN      ${Verificationtoken}`);
//   try {
//     const user = await User.findById({ _id: id });
//     if (!user) {
//       return next(new HttpError("Invalid link", 400));
//     }

//     console.log(`User:::: ${user}`);

//     const token = await UserVerification.find({
//       userId: user._id,
//       token: Verificationtoken,
//     });
//     if (!token) {
//       return next(new HttpError("Invalid link", 400));
//     }

//     console.log(`token::::: ${token.token}`);

//     console.log(`TOKEN:::::::: ${token}`);

//     const updatedUser = {
//       $set: {
//         verified: true,
//       },
//     };

//     const userUpdate = await User.updateOne({ _id: user._id }, updatedUser);
//     // await token.remove();

//     console.log(`User Update::: ${userUpdate}`);

//     res.status(200).json({ message: "Email verified successfully" });
//   } catch (error) {
//     return next(new HttpError("Something went wrong, Please try again!", 500));
//   }
// };

//email send for password reset
// const emailSend = async (req, res, next) => {
//   const { email } = req.body;
//   let findEmail, otpData, otpCode;
//   try {
//     findEmail = await User.findOne({ email: email });
//   } catch (err) {
//     return next(
//       new HttpError("Something went wrong to find email, Please try again", 500)
//     );
//   }
//   if (findEmail) {
//     otpCode = Math.floor(Math.random() * 10000 + 1);
//     otpData = new Otp({
//       email: email,
//       code: otpCode,
//       expireIn: new Date().getTime() + 600 * 1000,
//     });
//   } else {
//     return next(new HttpError("Email does not exit", 404));
//   }

//   try {
//     let otpDataResponse = await otpData.save();
//     sendOtpEmail(email, otpCode);
//   } catch (err) {
//     return next(new HttpError("Saving data is failed!", 500));
//   }

//   res.json({ message: "Please check your Email ID" });
// };

//change password request
// const changePassword = async (req, res, next) => {
//   const { email, otp, password } = req.body;
//   let otpData;
//   try {
//     otpData = await Otp.find({ email: email, code: otp });
//   } catch (err) {
//     return next(new HttpError("Something went wrong to find OTP data.", 500));
//   }

//   let hashPassword;
//   try {
//     hashPassword = await bcrypt.hash(password, 12);
//   } catch (err) {
//     return next(
//       new HttpError("Could not hash a password, please try again.", 500)
//     );
//   }

//   if (otpData) {
//     let currentTime = new Date().getTime();
//     let diff = otpData.expireIn - currentTime;
//     if (diff < 0) {
//       return next(new HttpError("OTP Expires"));
//     } else {
//       try {
//         let user = await User.find({ email: email });
//         user.password = hashPassword;
//         let userpassword = user.password;
//         const UpdatedUserPassword = {
//           $set: {
//             password: userpassword,
//           },
//         };
//         await User.updateOne({ email: email }, UpdatedUserPassword);
//       } catch (err) {
//         return next(new HttpError("Changing Password is failed.", 500));
//       }
//     }
//   } else {
//     return next(new HttpError("Invalid Otp", 404));
//   }
//   res.json({ message: "Password Changed Successfully" });
// };

exports.login = login;
exports.signUp = signUp;
// exports.verificationEmail = verificationEmail;
// exports.emailSend = emailSend;
// exports.changePassword = changePassword;
