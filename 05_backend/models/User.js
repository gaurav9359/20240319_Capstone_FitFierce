const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'trainer'], 
    required:true
  },
  image: {
    type: String, 
  },
  banner: {
    type: String,
  },
  description: {
    type: String, 
  },
  trainer_speciality: {
    type: String, 
  },
  created_at: {
    type: Date,
    default: Date.now, 
  },
  price: {
    type: Number, 
  },
  validity_days: {
    type: Number,  
  },
  subscribed_plans:[
    {
      type:String,
    }
  ]
  
});

module.exports = mongoose.model("User", userSchema);
