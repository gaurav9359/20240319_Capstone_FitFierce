const mongoose = require('mongoose');

// Exercise sub-schema
// const exerciseSchema = new mongoose.Schema();

// Main schema (plan)
const planSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (optional trainer)
  },
  trainer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (optional trainer)
  },
  date: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      exercise_name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        enum: [
          'strength-and-conditioning',
          'yoga',
          'pilates',
          'cardio',
          'dance',
          'martial-arts',
          'zumba',
          'mindfulness',
          'mobility',
          'prenatal-and-postnatal',
        ],
        required: true,
      },
      sets: {
        type: Number,
        required: true,
      },
      estimated_time: {
        type: String, // Can be a string representing time duration (e.g., "30min")
        required: true, // Now required field
      },
      isDone: {
        type: Boolean,
        default: false
      },
      trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (optional trainer)
      }
    }
  ], // Array of exercise objects based on sub-schema
 
});

module.exports = mongoose.model("Plan", planSchema);
