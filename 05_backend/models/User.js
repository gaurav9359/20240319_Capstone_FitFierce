const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures unique email addresses
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
    enum: ['user', 'trainer'], // Restricts role to either 'user' or 'trainer'
    required:true
  },
  image: {
    type: String, // Can be null or empty string if no image provided
  },
  banner: {
    type: String, // Can be null or empty string if no banner provided
  },
  description: {
    type: String, // Can be null or empty string if no description provided
  },
  trainer_speciality: {
    type: String, // Can be null or empty string if not a trainer
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically assigns current timestamp on creation
  },
  price: {
    type: Number,  // Added field for price
  },
  validity_days: {
    type: Number,  // Added field for validity (days, weeks, months, etc.)
  },
  subscribed_plans:[
    {
      type:String,
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
