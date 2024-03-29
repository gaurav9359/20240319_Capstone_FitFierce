const express = require("express");
const router = express.Router();
const subscribeController= require("../controllers/subscribeController")
const { verifyJwt, getUserMiddleware, fetchWithAuthorization } = require("../dependencies/jwtHelpers");


//create Exercise
router.post("/purchase", verifyJwt, getUserMiddleware, subscribeController.subscribePlan);



module.exports=router;