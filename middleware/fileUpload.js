const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

console.log("running on line no. 11");

const fileUpload = multer({
  
  limits: 10000000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE[file.mimetype];
      cb(null, uuidv4() + "." + ext);
      console.log("running on line no. 24");
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
    console.log("running on line no. 31");
  },
});
console.log(fileUpload.limits);
console.log(fileUpload.filename);
console.log(fileUpload.fileFilter);
module.exports = fileUpload;
