const express = require("express");
const { check } = require("express-validator");

const propertyControllers = require("../controllers/property_controllers");
const fileUpload = require("../middleware/fileUpload");


const router = express.Router();

//router.use(checkAuth);

//getting all property from admin side
router.get("/", propertyControllers.getAllproperty);

//sending email from admin to user
// router.post("/emailalert", propertyControllers.sendEmailAlert);

//Creating property
router.post(
  "/addproperty",
  // checkAuth,
  
  [
    check("images"),
    check("propertypurpose"),
    check("propertytype"),
    check("propertysubtype"),
    check("propertysize"),
    check("propertysizetype"),
    check("propertyprice"),
    check("propertytitle"),
    check("propertydescription"),
    check("propertylocation"),
    check("propertyyearbuilt"),
    check("propertynoofbedroom"),
    check("propertynoofbathroom"),
    check("propertynoofcarparking"), 
    check("propertyprimarydetails"),
    check("propertySecondaryDetaile"),
    check("propertyservices"),
    check("propertyEntertainment"),
    check("propertyNearByLandmarks"),
    check("numberoffloors"),
    check("unitfloor"),
  ],
  propertyControllers.createproperty
);

//Getting property of user
router.get("/:userId", propertyControllers.getpropertyByUserId);

//getting specific property from admin side
router.get("/property/:propertyId", propertyControllers.getSpecificproperty);

//updating specific property from admin side
router.patch(
  "/property/:propertyId",
  propertyControllers.updateSpecificproperty
);

//updating specific Property from User side
router.patch(
  "/property/:propertyId",
  propertyControllers.updateSpecificUserproperty
);

//deleting specific property from admin side
router.delete(
  "/property/:propertyId",
  propertyControllers.deleteSpecificproperty
);

//deleting property by id
router.delete("/:propertyId", propertyControllers.deleteproperty);

module.exports = router;


