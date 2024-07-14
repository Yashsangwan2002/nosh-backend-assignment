// models/dishModel.js
const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  dishName: { type: String, required: true },
  dishId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isPublished: { type: Boolean, default: true }
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
