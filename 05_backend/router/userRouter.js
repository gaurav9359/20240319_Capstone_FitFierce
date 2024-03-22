
const express = require("express");
const router = express.Router();
const exerciseController= require("../controllers/exerciseController")
const { verifyJwt, getUserMiddleware, fetchWithAuthorization } = require("../dependencies/jwtHelpers");


//create Exercise
router.post("/createExercise", verifyJwt, getUserMiddleware, exerciseController.createExercise);

//Read Exercise
router.get("/readExercisei", verifyJwt, getUserMiddleware, exerciseController.getAllExercises);

//Read Exercise
router.get("/readExercise/", verifyJwt, getUserMiddleware, exerciseController.getExerciseToday);

//Update Exercise
router.put("/updateExercise", verifyJwt, getUserMiddleware, exerciseController.updateExercise);

//Delete Exercise
router.delete("/deleteExercise", verifyJwt, getUserMiddleware, exerciseController.deleteExercise);

module.exports= router;

