const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const tokenManager = require("../tokenManager");
require("dotenv").config();
const User = require("../models/User");
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
}= require("../dependencies/validator/User")




async function signupTrainer(req, res) {
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
        return res.status(400).json({ message: 'Invalid input' });
      }
      console.log("user wordk")
  
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
  
      res.status(201).json({ message: 'Trainer account created successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async function signup(req, res) {
    try {
      const { name, email, password, phone_number } = req.body;
  
      // Validate user input
      if (
        !nameValidator(name) ||
        !emailValidator(email) ||
        !passwordValidator(password) ||
        !phoneNumberValidator(phone_number)
      ) {
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
  
      res.status(201).json({ message: 'User account created successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

async function signin(req,res){
    const { email, password } = req.body;

  // Validate the user input
  if (!emailValidator(email) || !passwordValidator(password)) {
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
    // localStorage.setItem('jwtToken', token); // Store token in localStorage
    // Send the token in the response Body
    // Once the frontend and backend are connected,
    // the token will be sent in the response header
    res.status(200).json({ token, role: user.role });
    // if (res.ok) {
    //   localStorage.setItem('token', token);
      
    //   localStorage.setItem('role', user.role);
    //   console.log("Stored locally")
    // }

    // Store the token temporarily in another file in root
    // tokenManager.setToken(token);
    // setAuthToken(token);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { signup, signupTrainer,signin };