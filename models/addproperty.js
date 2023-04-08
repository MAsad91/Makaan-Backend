const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema({
  propertypurpose: { type: String  },
  propertytype: { type: String  },
  propertysubtype: { type: String  },
  propertysize: { type: Number  },
  propertysizetype: { type: String },
  propertyprice: { type: Number },
  propertytitle: { type: String },
  propertydescription: { type: String },
  propertylocation: { type: String },
  propertybuiltyear: { type: String },
  propertynoofbedroom: { type: Number },
  propertynoofbathroom: { type: Number },
  propertynoofcarparking: { type: Number },
  images: [{ type: String  }],

  propertyprimarydetails: [{  detailType: { type: String }, detailTypeCount: { type: String } } ],

  // propertyprimarydetails: [{ type: String  }],
  propertySecondaryDetaile: [{ type: String  }],
  propertyservices: [{ type: String  }],
  propertyEntertainment: [{ type: String  }],
  propertyNearByLandmarks: [{ type: String  }],
  numberoffloors: { type: String  },
  unitfloor: { type: String  },
  // creator: { type: mongoose.Types.ObjectId, required: true, ref: "Property" },
});

module.exports = mongoose.model("Property", propertySchema);
