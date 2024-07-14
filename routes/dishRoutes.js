const express = require('express');
const router = express.Router();
const Dish = require('../models/dishModel'); // Adjust the path to your Dish model
const { updateDishStatus } = require('../controllers/dishController');

// Get all dishes
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Toggle the isPublished status of a dish
router.patch('/toggle/:dishId', async (req, res) => {
    try {
      const dish = await updateDishStatus(req.params.dishId);
      res.json(dish);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
