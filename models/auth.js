const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  phoneno: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // address: { type: String, required: true },
  // contactno: { type: String, required: true },
  
  // certificatespermitsrequests: [
  //   {
  //     type: mongoose.Types.ObjectId,
  //     required: true,
  //     ref: "CertificatesPermitsRequest",
  //   },
  // ],
  // verified: { type: Boolean, default: true },
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
