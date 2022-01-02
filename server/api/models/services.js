const mongoose = require("mongoose");
const ShortUniqueId = require("short-unique-id");

const uid = new ShortUniqueId({ length: 8 });
var id = uid;

const serviceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  uId: { type: String, default: id },
  Sr_No: { type: String },
  Blood_Bank_Name: { type: String },
  State: { type: String },
  District: { type: String },
  City: { type: String },
  Address: { type: String },
  Pincode: { type: String },
  Contact_No: { type: String },
  Mobile: { type: String },
  Helpline: { type: String },
  Email: { type: String },
  Nodal_Officer: { type: String },
  Contact_Nodal_Officer: { type: String },
  Mobile_Nodal_Officer: { type: String },
  Email_Nodal_Officer: { type: String },
  Qualification_Nodal_Officer :{type:String},
  Category: { type: String },
  Blood_Component_Available: { type: String },
  Apheresis: { type: String },
  Service_Time: { type: String },
  License: { type: String },
  Date_License_Obtained: { type: String },
  Date_of_Renewal: { type: String },
  Latitude: { type: String },
  Longitude: { type: String },
});

module.exports = mongoose.model("blood_service", serviceSchema);
