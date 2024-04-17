const mongoose = require('mongoose');
const User=require('../models/User')

const subscriptionSchema = new mongoose.Schema({
  user_id: {
    type:String,
    required: true,
  },
  trainer_id: {
    type: String,
    required:true, // Reference to the User model 
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
