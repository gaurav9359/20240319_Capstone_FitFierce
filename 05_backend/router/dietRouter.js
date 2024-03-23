
const express = require("express");
const router = express.Router();
const dietController=require('../controllers/dietController')
const { verifyJwt, getUserMiddleware,  } = require("../dependencies/jwtHelpers");

console.log("oreno")

//create Exercise
router.post("/createDiet", verifyJwt, getUserMiddleware, dietController.createDietplan);

// //Read Exercise
// router.get("/readExercisei", verifyJwt, getUserMiddleware, exerciseController.getAllExercises);

// //Read Exercise
// router.get("/readExercise/", verifyJwt, getUserMiddleware, exerciseController.getExerciseToday);

//Update diet
router.put("/updateDiet", verifyJwt, getUserMiddleware, dietController.updateDiet);

// //Update status
// router.put("/updateStatus", verifyJwt, getUserMiddleware, exerciseController.updateStatus);

// //Delete Exercise
// router.delete("/deleteExercise", verifyJwt, getUserMiddleware, exerciseController.deleteExercise);

module.exports= router;

