// models/WasteModel.js
const mongoose = require('mongoose');

const supplySchema = new mongoose.Schema({
  supplyDate: { type: Date, required: true },
  category: { type: String, required: true },
  weight: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  status: { type: String, required: true },
  pickedUpDate: { type: Date },
  pickedUpPlace: { type: String },
  dropDownDate: { type: Date },
  dropDownPlace: { type: String },
});

const Supply = mongoose.model('Supply', supplySchema);

module.exports = Supply;
