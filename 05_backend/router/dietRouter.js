
const express = require("express");
const router = express.Router();
const dietController=require('../controllers/dietController')
const { verifyJwt, getUserMiddleware,  } = require("../dependencies/jwtHelpers");

console.log("oreno")

//create Diet
router.post("/createDiet", verifyJwt, getUserMiddleware, dietController.createDietplan);

//Read allDiet
router.get("/getAllDiet", verifyJwt, getUserMiddleware, dietController.getAllDiet);

//Read Exercise
router.get("/getDietToday/", verifyJwt, getUserMiddleware, dietController.getDietToday);

//Update diet
router.put("/updateDiet", verifyJwt, getUserMiddleware, dietController.updateDiet);

//Update status
router.put("/updateDietStatus", verifyJwt, getUserMiddleware, dietController.updateDietStatus);

//Delete Exercise
router.delete("/deleteDiet", verifyJwt, getUserMiddleware, dietController.deleteDiet);

module.exports= router;

