
const express = require("express");
const router = express.Router();
const userController= require("../controllers/userController")
const { verifyJwt, getUserMiddleware, fetchWithAuthorization } = require("../dependencies/jwtHelpers");


//create Exercise
router.get("/getuser", verifyJwt, getUserMiddleware, userController.getUser);

//create Exercise
router.put("/updateUser", verifyJwt, getUserMiddleware, userController.updateUser);

module.exports= router;

