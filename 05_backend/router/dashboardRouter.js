const express = require("express");
const router = express.Router();
const dashboardController= require("../controllers/dashboardController")
const { verifyJwt, getUserMiddleware, fetchWithAuthorization } = require("../dependencies/jwtHelpers");

// routes to get monthly exercise and diet completion
router.get('/exercise', verifyJwt, getUserMiddleware, dashboardController.getMonthlyExerciseCompletion)

router.get('/diet', verifyJwt, getUserMiddleware, dashboardController.getMonthlyDietCompletion)


module.exports=router;