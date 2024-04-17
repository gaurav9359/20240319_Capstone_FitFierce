// import all the dependencies and modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// import validators
const {
    nameValidator,
    emailValidator,
    passwordValidator,
    phoneNumberValidator,
    roleValidator,
    imageValidator,
    bannerValidator,
    descriptionValidator,
    trainerSpecialityValidator,
    priceValidator,
    validityDaysValidator,
}= require("../dependencies/validator/User");
const { response } = require("express");




async function signupTrainer(req, res) {

  //extract all the necessary variables from req.body
    try {
      const {
        name,
        email,
        password,
        phone_number,
        role,
        image,
        banner,
        description,
        trainer_speciality,
        price,
        validity_days,
      } = req.body;
  
      // Validate user input
      if (
        !nameValidator(name) ||
        !emailValidator(email) ||
        !passwordValidator(password) ||
        !phoneNumberValidator(phone_number) ||
        !roleValidator(role) ||
        !imageValidator(image) ||
        !bannerValidator(banner) ||
        !descriptionValidator(description) ||
        !trainerSpecialityValidator(trainer_speciality) ||
        !priceValidator(price) ||
        !validityDaysValidator(validity_days)
      ) {
        // if validation fails then send error message
        return res.status(400).json({ message: 'Invalid input' });
      }
  
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phone_number,
        role,
        image,
        banner,
        description,
        trainer_speciality,
        price,
        validity_days,
      });
  
      // Save the new user
      await newUser.save();
  
      //if account creation is successful send the message
      res.status(201).json({ message: 'Trainer account created successfully' });
    } catch (error) {
      // if any error occurs send that error message
      res.status(500).json({ message: error.message });
    }
  }
  
  async function signup(req, res) {
    try {
      // get all the necessary input from req.body
      const { name, email, password, phone_number } = req.body;
  
      // Validate user input
      if (
        !nameValidator(name) ||
        !emailValidator(email) ||
        !passwordValidator(password) ||
        !phoneNumberValidator(phone_number)
      ) {
        // return if validation fails
        return res.status(400).json({ message: 'Invalid input' });
      }
  
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phone_number,
        role:'user',
      });
  
      // Save the new user
      await newUser.save();
  
      // send the success message
      res.status(201).json({ message: 'User account created successfully' });
    } catch (error) {
      // if any error comes send the error message
      res.status(500).json({ message: error.message });
    }
  }

async function signin(req,res){
     // get all the inputs from req.body
    const { email, password } = req.body;

    // Validate the user input
    if (!emailValidator(email) || !passwordValidator(password)) {
      // return if validation fails
      return res.status(400).json({ message: "Invalid input" });
    }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create and assign a token
    const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, { expiresIn: '10h' });

    // send token and role in response
    res.status(200).json({ token, role: user.role });
    

  } catch (error) {
    // send error message if it occurs
    res.status(500).json({ message: error.message });
  }
}

module.exports = { signup, signupTrainer,signin };