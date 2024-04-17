
const express = require("express");
const router = express.Router();
const userController= require("../controllers/userController")
const { verifyJwt, getUserMiddleware, fetchWithAuthorization } = require("../dependencies/jwtHelpers");


//get user information
router.get("/getuser", verifyJwt, getUserMiddleware, userController.getUser);

// get all the trainer's info
router.get("/getalltrainer",verifyJwt,getUserMiddleware,userController.getallTrainer)

// get trainer info by id
router.get("/gettrainerbyid",verifyJwt, getUserMiddleware, userController.getTrainerById)

//update user
router.put("/updateUser", verifyJwt, getUserMiddleware, userController.updateUser);

module.exports= router;

