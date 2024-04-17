
const express = require("express");
const router = express.Router();
const exerciseController= require("../controllers/exerciseController")
const { verifyJwt, getUserMiddleware, fetchWithAuthorization } = require("../dependencies/jwtHelpers");


//create Exercise
router.post("/createExercise", verifyJwt, getUserMiddleware, exerciseController.createExercise);

//get all Exercise
router.get("/getAllExercise", verifyJwt, getUserMiddleware, exerciseController.getAllExercises);

//get today's Exercise
router.get("/readExercise", verifyJwt, getUserMiddleware, exerciseController.getExerciseToday);

//Update Exercise
router.put("/updateExercise", verifyJwt, getUserMiddleware, exerciseController.updateExercise);

//Update status
router.put("/updateStatus", verifyJwt, getUserMiddleware, exerciseController.updateStatus);

//Delete Exercise
router.delete("/deleteExercise", verifyJwt, getUserMiddleware, exerciseController.deleteExercise);

module.exports= router;

