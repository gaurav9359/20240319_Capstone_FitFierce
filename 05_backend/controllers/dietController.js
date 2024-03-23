const Dietplan = require("../models/DietPlans");
const Subscription= require("../models/Subscription")
const {
    dietNameValidator,
    quantityValidator,
    caloriesValidator,
    timeToEatValidator,
} = require("../dependencies/validator/Diet");

const mongoose = require("mongoose");

// create meal
const createDietplan = async (req, res) => {
    try {
      // 1. Extract meal data from request body
      const  meals  = req.body;
  
      // 2. Validate meal data (assuming you have validator functions)
      const validMeals = meals.filter((meal) => {
        const { diet_name, quantity, calories, time_toEat } = meal;
        return (
          dietNameValidator(diet_name) &&
          quantityValidator(quantity) &&
          caloriesValidator(calories) &&
          timeToEatValidator(time_toEat)
        );
      });
  
      if (validMeals.length !== meals.length) {
        return res.status(400).json({ message: "Invalid meal data" });
      }
  
      // 3. Extract user ID and today's date
      const userId = req.user._id; // Assuming you have user ID in req.user object
      const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
  
      // 4. Find existing dietplan (based on user role)
      let prevDietplan;
      if (req.user.role === "user") {
        prevDietplan = await Dietplan.findOne({ user_id: userId, date });
      } else if (req.user.role === "trainer") {
        prevDietplan = await Dietplan.findOne({ trainer_id: userId, date });
      } else {
        return res.status(400).json({ message: "Invalid user role" });
      }
  
      // 5. Update existing dietplan or create a new one
      if (prevDietplan) {
        prevDietplan.meals.push(...validMeals);
      } else {
        prevDietplan = new Dietplan({
          [req.user.role === "user" ? "user_id" : "trainer_id"]: userId,
          meals: validMeals,
          date,
        });
      }
  
      // 6. Save the dietplan (update or create)
      const savedDietplan = await prevDietplan.save();
  
      // 7. Send successful response with saved dietplan
      res.status(201).json(savedDietplan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  //update diet
  const updateDiet = async (req, res) => {
    try {
      // 1. Extract meal data and ID from request body
      const { mealId, ...mealData } = req.body;
      const { diet_name, quantity, calories, time_toEat } = mealData;
  
      // 2. Validate meal data (if updating specific fields)
      if (
        !dietNameValidator(diet_name) ||
        !quantityValidator(quantity) ||
        !caloriesValidator(calories) ||
        !timeToEatValidator(time_toEat)
      ) {
        return res.status(400).json({ message: "Invalid meal data" });
      }
  
      // 3. Extract user ID and today's date
      const userId = req.user._id;
      const date = new Date().toISOString().slice(0, 10);
  
      // 4. Find the diet plan to update (based on user role)
      let dietPlanToUpdate;
      if (req.user.role === "user") {
        dietPlanToUpdate = await Dietplan.findOne({
          user_id: userId,
          date,
          "meals._id": mealId,
        });
      } else if (req.user.role === "trainer") {
        dietPlanToUpdate = await Dietplan.findOne({
          trainer_id: userId,
          date,
          "meals._id": mealId,
        });
      } else {
        return res.status(400).json({ message: "Invalid user role" });
      }
  
      // 5. Check if diet plan exists and handle errors
      if (!dietPlanToUpdate) {
        return res.status(404).json({ message: "Diet plan not found" });
      }
  
      // 6. Update the meal (based on user role and update approach)
      const updatedMeals = dietPlanToUpdate.meals.map((meal) => {
        if (meal._id.toString() === mealId) {
          // Check if meal IDs match
          // Update specific fields if provided in the request body
          return {
            ...meal,
            ...(diet_name ? { diet_name } : {}),
            ...(quantity ? { quantity } : {}),
            ...(calories ? { calories } : {}),
            ...(time_toEat ? { time_toEat } : {}),
          };
        }
        return meal; // Keep other meals unchanged
      });
      dietPlanToUpdate.meals = updatedMeals;
  
      // 7. Save the updated diet plan
      const savedDietPlan = await dietPlanToUpdate.save();
  
      // 8. Send successful response with saved diet plan
      res.status(200).json(savedDietPlan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  module.exports={createDietplan,updateDiet}