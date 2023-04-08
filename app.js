// require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");
const multer = require('multer');
const upload = multer({storage : storage , limits: {fileSize: 1000000}, fileFilter: fileFilter});
const { v4: uuidv4 } = require("uuid");
const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const authRoutes = require("./routes/auth");
// const adminRoutes = require("./routes/admin");
// const user = require("./routes/user");
const property = require("./routes/addproperty");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.post('uploads/image', upload.array('images', 5), (req,res) => {
  console.log(images);
  try {
    res.send(req.files);
  } catch (error) {
    console.log(error);
    res.send(400);
  }
  // upload(req, res, (err) => {
  //   if(err) {
  //     res.status(400).send('something went wrong!');
  //   }
  //   res.send(req.file);
  // });
});

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    const ext = MIME_TYPE[file.mimetype];
    cb(null, uuidv4() + "." + ext);
    console.log("running on line no. 24");
  },
});
function fileFilter (req, file, cb) {
  const isValid = !!MIME_TYPE[file.mimetype];
  let error = isValid ? null : new Error("Invalid mime type!");
  cb(error, isValid);
  console.log("running on line no. 31");
}



app.use("/auth", authRoutes);
// app.use("/admin", adminRoutes);
// app.use("/userlist", user);

app.use("/property", property);

app.use((req, res, next) => {
  return next(new HttpError("Could not find this route", 404));
});


app.use((error, req, res, next) => {
  if (req.files) {
    req.files.map((file) => {
      fs.unlink(file.path, (err) => {
        console.log(err);
      });
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect('mongodb+srv://asadnisar108:asad4291@cluster0.05d8yek.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    app.listen(5000);
    console.log('server is live on 5000');
  })
  .catch((err) => console.log(err));
