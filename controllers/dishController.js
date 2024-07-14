// controllers/dishController.js
const Dish = require('../models/dishModel'); // Adjust the path to your Dish model
const socket = require('../socket');

const updateDishStatus = async (dishId) => {
  try {
    const dish = await Dish.findOne({ dishId: dishId });
    if (dish) {
      dish.isPublished = !dish.isPublished;
      await dish.save();

      // Emit the updated dish status to all connected clients
      const io = socket.getIO();
      io.emit('dishUpdated', dish);

      return dish;
    } else {
      throw new Error('Dish not found');
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  updateDishStatus,
};
