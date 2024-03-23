const mongoose = require('mongoose');


// Main schema (dietplan)
const dietplanSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  trainer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (optional trainer)
  },
  date: {
    type: Date,
    required: true,
  },
  meals: [{
    
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
    isDone:{
      type: Boolean,
      default: false
    }
  }], // Array of meal objects based on sub-schema
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Dietplan", dietplanSchema);
