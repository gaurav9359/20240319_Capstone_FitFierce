const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model 
  },
  trainer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model 
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
      reps:{
        type:Number,
      },
      estimated_time: {
        type: String, 
        required: true, 
      },
      isDone: {
        type: Boolean,
        default: false
      },
      
    }
  ], 
 
});

module.exports = mongoose.model("Plan", planSchema);
