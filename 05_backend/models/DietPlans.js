const mongoose = require('mongoose');


const dietplanSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  trainer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model 
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
    measurement:{
      type:String,
      required:true
    },
    calories: {
      type: Number,
      required: true,
    },
    time_toEat: {
      type: String,
      enum: ['morning', 'evening', 'night'], 
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
