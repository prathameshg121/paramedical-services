const mongoose = require("mongoose");
const ShortUniqueId = require("short-unique-id");

const uid = new ShortUniqueId({ length: 8 });
var id = uid;

const covidSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  uId: { type: String, default: id },
  center_id: { type: String },
  name: { type: String },
  State: { type: String },
  District: { type: String },

  Address: { type: String },

  Latitude: { type: String },
  Longitude: { type: String },
});

module.exports = mongoose.model("covidvacs", covidSchema);
