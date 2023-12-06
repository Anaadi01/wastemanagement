// models/WasteModel.js
const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  wasteType: { type: String, required: true },
  weight: { type: String, required: true },
  address: { type: String, required: true },
  area: { type: String, required: true },
  pincode: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
});

const WasteModel = mongoose.model('Waste', guestSchema);

module.exports = WasteModel;
