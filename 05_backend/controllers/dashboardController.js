// import all the dependencies and packages
const Plan = require('../models/ExercissePlans');
const User = require('../models/User')
const Dietplan = require("../models/DietPlans");

const getMonthlyExerciseCompletion = async (req, res) => {
  try {
    // get userid from middleware's req
    const userid  = req.user._id;
    // console.log(req.user.role,userid)

    // Get the current date
    const currentDate = new Date();

    // Get the first and last day of the current month
    const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const currentMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Get the first and last day of the previous month
    const prevMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const prevMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

    // Fetch exercise data for current month and previous month
    const currentMonthExercises = await Plan.find({
      userid: userid,
      trainer_id: { $exists: false },
      date: { $gte: currentMonthStart, $lte: currentMonthEnd },
    });

    const prevMonthExercises = await Plan.find({
      userid: userid,
      trainer_id: { $exists: false },
      date: { $gte: prevMonthStart, $lte: prevMonthEnd },
    });
    // console.log(currentMonthExercises)
    // console.log(currentMonthExercises)

    // Create an array to store the daily exercise completion data
    const currentMonthCompletionData = [];
    const prevMonthCompletionData = [];
    const totalNumberOfDays=[]
    let index=0;
    
    // Iterate through the days of the current month and store it daywise
    for (let date = new Date(currentMonthStart); date <= currentMonthEnd; date.setDate(date.getDate() + 1)) {
        index=index+1
      const currentDayExercises = currentMonthExercises.filter((exercise) => {
        const exerciseDate = new Date(exercise.date);
        return exerciseDate.getDate() === date.getDate() && exerciseDate.getMonth() === date.getMonth() && exerciseDate.getFullYear() === date.getFullYear();
      });

      // if no exercise found for current day then push 0 for completion percentage
      if(currentDayExercises.length===0){
        currentMonthCompletionData.push(0)
      }
      else{
        // calcualte percentage of completion of daywise exercise
        const completedCurrentDayExercises = currentDayExercises[0].exercises.filter((exercise) => exercise.isDone);
      console.log(completedCurrentDayExercises.length,"oreno")
      const currentDayCompletionPercentage = (completedCurrentDayExercises.length / currentDayExercises[0].exercises.length) * 100 || 0;
      currentMonthCompletionData.push(currentDayCompletionPercentage);
      }
      totalNumberOfDays.push(index)
    }

    // Iterate through the days of the previous month
    for (let date = new Date(prevMonthStart); date <= prevMonthEnd; date.setDate(date.getDate() + 1)) {
      const prevDayExercises = prevMonthExercises.filter((exercise) => {
        const exerciseDate = new Date(exercise.date);
        return exerciseDate.getDate() === date.getDate() && exerciseDate.getMonth() === date.getMonth() && exerciseDate.getFullYear() === date.getFullYear();
      });

      // if any day of previous month have 0 exercise then push 0
      if(prevDayExercises.length===0){
        prevMonthCompletionData.push(0)
      }
else{
   // calcualte percentage of completion of daywise diet
    const completedPrevDayExercises = prevDayExercises[0].exercises.filter((exercise) => exercise.isDone);
      const prevDayCompletionPercentage = (completedPrevDayExercises.length / prevDayExercises[0].exercises.length) * 100 || 0;
      prevMonthCompletionData.push(prevDayCompletionPercentage);
}
    }

    // sending the necessary information in response to show graph
    res.status(200).json({
        totalNumberOfDays,
      currentMonthCompletionData,
      prevMonthCompletionData,
    });
  } catch (error) {
    // if any error occurs in middle then return 
    console.error(error);
    res.status(500).json({ message: 'Error retrieving exercise completion data' });
  }
};

const getMonthlyDietCompletion = async (req, res) => {
    try {
      // get userid from middleware
      const userid = req.user._id;
  
      // Get the current date
      const currentDate = new Date();
  
      // Get the first and last day of the current month
      const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const currentMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
      // Get the first and last day of the previous month
      const prevMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      const prevMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
  
      // Fetch the diet data for the current month and previous month
      const currentMonthDiets = await Dietplan.find({
        user_id: userid,
        trainer_id: { $exists: false },
        date: { $gte: currentMonthStart, $lte: currentMonthEnd },
      });
  
      const prevMonthDiets = await Dietplan.find({
        user_id: userid,
        trainer_id: { $exists: false },
        date: { $gte: prevMonthStart, $lte: prevMonthEnd },
      });
  
      // Create an array to store the daily diet completion data
      const currentMonthCompletionData = [];
      const prevMonthCompletionData = [];
      const totalNumberOfDays = [];
      let index = 0;
  
      // Iterate through the days of the current month
      for (let date = new Date(currentMonthStart); date <= currentMonthEnd; date.setDate(date.getDate() + 1)) {
        index = index + 1;
        // store all the diet for current day
        const currentDayDiets = currentMonthDiets.filter((diet) => {
          const dietDate = new Date(diet.date);
          return dietDate.getDate() === date.getDate() && dietDate.getMonth() === date.getMonth() && dietDate.getFullYear() === date.getFullYear();
        });
  

        // if any day have 0 diet then push 0
        if (currentDayDiets.length === 0) {
          currentMonthCompletionData.push(0);
        } else {
          // calculate the percentage of completion for each day
          const completedCurrentDayMeals = currentDayDiets[0].meals.filter((meal) => meal.isDone);
          const currentDayCompletionPercentage = (completedCurrentDayMeals.length / currentDayDiets[0].meals.length) * 100 || 0;
          currentMonthCompletionData.push(currentDayCompletionPercentage);
        }
        totalNumberOfDays.push(index);
      }
  
      // Iterate through the days of the previous month
      for (let date = new Date(prevMonthStart); date <= prevMonthEnd; date.setDate(date.getDate() + 1)) {
        const prevDayDiets = prevMonthDiets.filter((diet) => {
          const dietDate = new Date(diet.date);
          return dietDate.getDate() === date.getDate() && dietDate.getMonth() === date.getMonth() && dietDate.getFullYear() === date.getFullYear();
        });
  
        // if any day of previous month have 0 diet
        if (prevDayDiets.length === 0) {
          prevMonthCompletionData.push(0);
        } else {
          // calculate percentage of completion of diet for each day
          const completedPrevDayMeals = prevDayDiets[0].meals.filter((meal) => meal.isDone);
          const prevDayCompletionPercentage = (completedPrevDayMeals.length / prevDayDiets[0].meals.length) * 100 || 0;
          prevMonthCompletionData.push(prevDayCompletionPercentage);
        }
      }
  
      // sending the neccessary info to show graph
      res.status(200).json({
        totalNumberOfDays,
        currentMonthCompletionData,
        prevMonthCompletionData,
      });
    } catch (error) {
      // send the error message if necessary
      console.error(error);
      res.status(500).json({ message: 'Error retrieving diet completion data' });
    }
  };

module.exports={getMonthlyExerciseCompletion,getMonthlyDietCompletion}