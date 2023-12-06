// models/WasteModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderDate: { type: Date, required: true },
  category: { type: String, required: true },
  weight: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  status: { type: String, required: true },
  pickedUpDate: { type: Date },
  pickedUpPlace: { type: String },
  delieveredDate: { type: Date },
  delieveredPlace: { type: String },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
