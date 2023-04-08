const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Property = require("../models/addproperty");

// const { sendReportCheckEmail } = require("../emails/account");
const sharp = require("sharp");
const fs = require("fs");

//getting all property for admin side
const getAllproperty = async (req, res, next) => {
  let property;
  try {
    property = await property.find();
  } catch (err) {
    return next(new HttpError("Fetching all property is failed!", 500));
  }

  if (!property || property.length === 0) {
    return next(new HttpError("Could not find property", 404));
  }

  res.json(property.map((report) => report.toObject({ getters: true })));
};

//getting specific property from admin side
const getSpecificproperty = async (req, res, next) => {
  const propertyId = req.params.propertyId;
  let specificProperty;

  try {
    specificProperty = await property.findById(propertyId);
  } catch (err) {
    return next(new HttpError("Fetching property is failed", 500));
  }

  if (!property || property.length === 0) {
    return next(new HttpError("Could not find property.", 404));
  }

  res.json({ property });
};

//updating specific property from admin side
const updateSpecificproperty = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Input data is invalid.Please check your data!", 422)
    );
  }

  const {
    propertypurpose,
    propertytype,
    propertysubtype,
    propertysize,
    propertysizetype,
    propertyprice,
    propertytitle,
    propertydescription,
    propertylocation,
    propertybuiltyear,
    propertynoofbedroom,
    propertynoofbathroom,
    propertynoofcarparking,
    images,
    propertydetails,
    propertyfeature,
    propertyservices,
    numberoffloors,
    creator,
  } = req.body;

  const propertyId = req.params.propertyId;
  let report;

  const updatedDocument = {
    $set: {
      propertypurpose,
      propertytype,
      propertysubtype,
      propertysize,
      propertysizetype,
      propertyprice,
      propertytitle,
      propertydescription,
      propertylocation,
      propertybuiltyear,
      propertynoofbedroom,
      propertynoofbathroom,
      propertynoofcarparking,
      images: imagePath,
      propertydetails: [],
      propertyfeature: [],
      propertyservices: [],
      numberoffloors,
      // creator,
    },
  };

  try {
    property = await property.updateOne({ _id: propertyId }, updatedDocument);
  } catch (err) {
    return next(
      new HttpError(
        "Updating specific property is failed, Please try again!",
        500
      )
    );
  }

  res.json({ message: "property is Updated!" });
};

//updating specific property from user side
const updateSpecificUserproperty = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Input data is invalid.Please check your data!", 422)
    );
  }

  const {
    propertypurpose,
    propertytype,
    propertysubtype,
    propertysize,
    propertysizetype,
    propertyprice,
    propertytitle,
    propertydescription,
    propertylocation,
    propertybuiltyear,
    propertynoofbedroom,
    propertynoofbathroom,
    propertynoofcarparking,
    images,
    propertydetails,
    propertyfeature,
    propertyservices,
    numberoffloors,
    creator,
  } = req.body;

  const reportId = req.params.reportId;
  let report;

  const updatedDocument = {
    $set: {
      propertypurpose,
      propertytype,
      propertysubtype,
      propertysize,
      propertysizetype,
      propertyprice,
      propertytitle,
      propertydescription,
      propertylocation,
      propertybuiltyear,
      propertynoofbedroom,
      propertynoofbathroom,
      propertynoofcarparking,
      images: imagePath,
      propertydetails: [],
      propertyfeature: [],
      propertyservices: [],
      numberoffloors,
    },
  };

  try {
    report = await property.updateOne({ _id: reportId }, updatedDocument);
  } catch (err) {
    return next(
      new HttpError(
        "Updating specific property is failed, Please try again!",
        500
      )
    );
  }

  res.json({ message: "property is Updated!" });
};

//deleting specific property from admin side
const deleteSpecificproperty = async (req, res, next) => {
  const reportId = req.params.reportId;
  let report;

  try {
    report = await property.deleteOne({ _id: reportId });
  } catch (err) {
    return next(
      new HttpError(
        "Deleting specific property is failed, Please try again!",
        500
      )
    );
  }

  if (!report) {
    return next(
      new HttpError("could not find property for this specific id", 404)
    );
  }

  res.json({ message: "property is Deleted!" });
};

//getting property of user by their id
const getpropertyByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let userReport;

  try {
    userReport = await property.find({ creator: userId });
  } catch (err) {
    return next(
      new HttpError("Fetching property failed, Please try again!", 500)
    );
  }

  if (!userReport || userReport.length === 0) {
    return next(
      new HttpError("Could not find property for the provided user", 404)
    );
  }

  res.json(userReport.map((report) => report.toObject({ getters: true })));
};

//creating property
const createproperty = async (req, res, next) => {
  console.log(req.body, 'hey');
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return next(
  //     new HttpError("Input data is invalid.Please check your data!", 422)
  //   );
  // }

  //using sharp
  let imagePath = [];
  for (let file of req.body) {
    console.log('hello plz 1', file.name);
    let sharped = await sharp(file.path)
      .resize(300, 200, {
        fit: "fill",
      })
      .toFile(file.destination + "/addproperty" + file.filename);
      console.log('hello plz 2');

    console.log("sharped:::", sharped);
    console.log('hello plz 3');

    imagePath.push(file.destination + "/addproperty" + file.filename);
    console.log('hello plz 4');

    fs.unlinkSync(file.path);
  }

  const {
    propertypurpose,
    propertytype,
    propertysubtype,
    propertysize,
    propertysizetype,
    propertyprice,
    propertytitle,
    propertydescription,
    propertylocation,
    propertybuiltyear,
    propertynoofbedroom,
    propertynoofbathroom,
    propertynoofcarparking,
    images,
    propertyprimarydetails,
    propertySecondaryDetaile,
    propertyservices,
    propertyEntertainment,
    propertyNearByLandmarks,
    numberoffloors,
    unitfloor,
    // creator,
  } = req.body;
  console.log(numberoffloors);

  const createdReport = new Property({
    propertypurpose,
    propertytype,
    propertysubtype,
    propertysize,
    propertysizetype,
    propertyprice,
    propertytitle,
    propertydescription,
    propertylocation,
    propertybuiltyear,
    propertynoofbedroom,
    propertynoofbathroom,
    propertynoofcarparking,
    images: imagePath,
    propertyprimarydetails,
    propertySecondaryDetaile,
    propertyservices,
    propertyEntertainment,
    propertyNearByLandmarks,
    numberoffloors,
    unitfloor,
    // creator,
  });
  // console.log(
  //   "1property",
  //  createdReport
  //   );

  let userproperty;
  try {
    console.log("signup3");
    console.log(userproperty);
    
    userproperty = await createdReport.save();
    console.log(userproperty);
    
    
    console.log("signup4");
    res.send();
    // sendWelcomeEmail(userData.phoneno, userData.name);
  } catch (err) {
    return next(new HttpError("Creating user is failed. Please try again!"));
  }

  // try {
  //   //user = await User.findById(creator);
  //   userproperty = await property.findOne({ _id: _id });
  // } catch (err) {
  //   console.log(err);
  //   return next(
  //     new HttpError("Creating report is failed. Please try again!", 500)
  //   );
  // }

  // if (!property) {
  //   return next(new HttpError("Could not find property for the provided id.", 404));
  // }

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await createdReport.save({ session: sess });
  //   //user.propertys.push(createdReport);
  //   //await user.save({ session: sess });
  //   await User.updateOne(
  //     { _id: creator },
  //     { $push: { propertys: createdReport._id } }
  //   );
  //   await sess.commitTransaction();
  // } catch (err) {
  //   return next(
  //     new HttpError("Creating report is failed. Please try again!!!", 500)
  //   );
  // }

  // res.status(200).json({ Property_Report: createdReport });
  res.send();
};

//deleting report by id from user side
const deleteproperty = async (req, res, next) => {
  const propertyId = req.params.propertyId;

  const { creator } = req.body;

  let property;
  try {
    // property = await property.findById(reportId).populate("creator");
    property = await property.findOne({ _id: propertyId }).populate("creator");
    console.log("property:::", property);
  } catch (err) {
    return next(
      new HttpError("Something went wrong,could not delete report", 500)
    );
  }

  if (!property) {
    return next(new HttpError("Could not find report for this id!", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await property.remove({ session: sess });
    // property.creator.propertys.pull(property);
    // await property.creator.save({ session: sess });

    await User.updateOne(
      { _id: creator },
      { $pull: { property: property._id } }
    );

    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete report.",
      500
    );
    return next(error);
  }

  res.json({ message: "Deleted Report!" });
};

// const sendEmailAlert = async (req, res, next) => {
//   const { id, name } = req.body;

//   let user;
//   try {
//     user = await User.findById({ _id: id });
//   } catch (error) {
//     return next(new HttpError("Report user not find, Please try again!", 500));
//   }

//   if (!user) {
//     return next(new HttpError("Could not find user for the provided id.", 404));
//   }

//   if (user) {
//     let subject, text;
//     subject = "property Status";
//     text = `Dear ${name} your property has been checked.`;
//     sendReportCheckEmail(user.email, subject, text);
//   }

//   res.json({ message: "Email sent Successfully!" });
// };

exports.getAllproperty = getAllproperty;
exports.getSpecificproperty = getSpecificproperty;
exports.getpropertyByUserId = getpropertyByUserId;
exports.createproperty = createproperty;
exports.updateSpecificproperty = updateSpecificproperty;
exports.updateSpecificUserproperty = updateSpecificUserproperty;
exports.deleteproperty = deleteproperty;
exports.deleteSpecificproperty = deleteSpecificproperty;
// exports.sendEmailAlert = sendEmailAlert;
