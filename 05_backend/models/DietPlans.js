const mongoose = require('mongoose');

// Meal sub-schema
const mealSchema = new mongoose.Schema({
  diet_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  time_toEat: {
    type: String,
    enum: ['morning', 'evening', 'night'], // Restricts time to morning, evening, or night
    required: true,
  },
});

// Main schema (dietplan)
const dietplanSchema = new mongoose.Schema({
  dietplan_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  trainer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (optional trainer)
  },
  date: {
    type: Date,
    required: true,
  },
  meals: [mealSchema], // Array of meal objects based on sub-schema
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Dietplan", dietplanSchema);
