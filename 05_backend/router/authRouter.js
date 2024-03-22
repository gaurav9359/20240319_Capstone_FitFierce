// /auth
// - /signin
// - /signup

// Setting up the express router
const express = require("express");
const router = express.Router();

// Controller
const authController = require("../controllers/authController");

// Routes
router.post("/signup", authController.signup); //user
router.post("/signup/trainer", authController.signupTrainer); //trainer
router.post("/signin", authController.signin); //anyone

// Exporting the router
module.exports = router;
