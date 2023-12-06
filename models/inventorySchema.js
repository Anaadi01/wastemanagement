// models/WasteModel.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true, unique: true },
    weight: { type: Number, required: true, unique: true },
}, {
    timestamps: true
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
