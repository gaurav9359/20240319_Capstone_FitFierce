const Dietplan = require("../models/DietPlans");
const Subscription= require("../models/Subscription")
const {
    dietNameValidator,
    quantityValidator,
    caloriesValidator,
    timeToEatValidator,
} = require("../dependencies/validator/Diet");

const mongoose = require("mongoose");

//getAllDiet
const getAllDiet = async (req, res) => {
    try {
      // Get user ID
      const userId = req.user._id.toString();
      let dietToReturn = {}; // Final object to return
  
      // Handle user role
      if (req.user.role === 'user') {
        // Get all diets created by user
        const userDiets = await Dietplan.find({ user_id: new mongoose.Types.ObjectId(userId) });
  
        // Find active subscriptions for the user
        const activeSubscriptions = await Subscription.find({
          user_id: userId, // Replace with a dynamic trainer ID if needed
        });
  
        // Extract trainer IDs from active subscriptions
        const trainerIds = activeSubscriptions.map((subscription) => subscription.trainer_id);
  
        // Fetch diets from trainers (if any)
        const trainerDiets = await Promise.all(
          trainerIds.map(async (trainerId) => {
            return await Dietplan.find({ trainer_id: trainerId });
          })
        );
  
        // Combine diets from user and trainers
        dietToReturn = {
          userDiets: userDiets,
          trainerDiets: [].concat(...trainerDiets), // Flatten array
        };
      } else if (req.user.role === 'trainer') {
        // Get all diets created by the trainer
        const userDiets = await Dietplan.find({ trainer_id: new mongoose.Types.ObjectId(userId) });
        dietToReturn = userDiets;
      } else {
        res.status(400).json({ message: "Invalid user role" });
      }
  
      res.status(200).json(dietToReturn);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

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
      const date = new Date().toISOString().slice(0,10);
  
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

     //save the trainer exercise in all the user's exercise array
    if(req.user.role==='trainer'){
      // Find active subscriptions for the user
      const activeSubscriptions = await Subscription.find({
        trainer_id: userId  // Replace with a dynamic trainer ID if needed
      });
  
      // Extract trainer IDs from active subscriptions
      const userIds = activeSubscriptions.map((subscription) => subscription.user_id);
      console.log(userIds)
      const newDate= new Date(date);
      // Fetch exercises from trainers (if any)
      const userExercise = await Promise.all(
        userIds.map(async (user_Id) => {
          let user_object= new mongoose.Types.ObjectId(user_Id.toString())
          let diet_array= await Dietplan.findOne({user_id: user_object} );
          if(diet_array){
            diet_array.meals.push(...validMeals)
          }
          else{
            diet_array = new Dietplan({
              user_id: user_Id,
              exercises: validMeals,
              date,
            });
          }
          const savedDietUser=await diet_array.save();
  
          console.log(savedDietUser)
        })
      );
      }
  
      // 7. Send successful response with saved dietplan
      res.status(201).json(savedDietplan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

//   get Todays diet
const getDietToday = async (req, res) => {
    try {
      // Get user ID and today's date in YYYY-MM-DD format
      const userId = req.user._id.toString();
      const date = new Date().toISOString().slice(0, 10);
      let dietToReturn = {};
  
      // Handle user role
      if (req.user.role === 'user') {
        // Get diet plan created by user
        const userDietPlan = await Dietplan.findOne({ user_id: userId, date });
  
        // Find active subscriptions for the user
        const activeSubscriptions = await Subscription.find({ user_id: userId });
  
        // Extract trainer IDs from active subscriptions
        const trainerIds = activeSubscriptions.map(
          (subscription) => subscription.trainer_id
        );
  
        // Fetch diet plans from trainers (if any)
        const trainerDietPlans = await Promise.all(
          trainerIds.map(async (trainerId) => {
            return await Dietplan.findOne({ trainer_id: trainerId, date });
          })
        );
  
        // Combine diet plans from user and trainers
        dietToReturn = {
          userDietPlan: userDietPlan || null,
          trainerDietPlans: trainerDietPlans.filter(Boolean), // Remove null values
        };
      } else if (req.user.role === 'trainer') {
        // Trainer can only see diet plan created by themselves
        const trainerDietPlan = await Dietplan.findOne({
          trainer_id: userId,
          date,
        });
        dietToReturn = trainerDietPlan || null;
      } else {
        res.status(400).json({ message: 'Invalid user role' });
      }
  
      res.status(200).json(dietToReturn);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
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

  //delte diet by id
  // Delete a meal
const deleteDiet = async (req, res) => {
    try {
      // 1. Extract meal ID from request params
      const mealId = req.query.id;
  
      // 2. Extract user ID and today's date
      const userId = req.user._id;
      const date = new Date().toISOString().slice(0, 10);
  
      // 3. Find and potentially update the diet plan (based on user role)
      let updatedDietPlan;
      if (req.user.role === "user") {
        updatedDietPlan = await Dietplan.findOneAndUpdate(
          { user_id: userId, date },
          { $pull: { meals: { _id: new mongoose.Types.ObjectId(mealId) } } }
        );
      } else if (req.user.role === "trainer") {
        updatedDietPlan = await Dietplan.findOneAndUpdate(
          { trainer_id: userId, date },
          { $pull: { meals: { _id: mealId } } }
        );
      } else {
        return res.status(400).json({ message: "Invalid user role" });
      }
  
      // 4. Check if diet plan exists and handle errors
      if (!updatedDietPlan) {
        return res.status(404).json({ message: "Diet plan not found" });
      }
  
      // 5. Debugging and optional response with updated diet plan
      console.log("updatedDietPlan:", updatedDietPlan);
      // res.status(200).json(updatedDietPlan); // Optional: return updated document if needed
  
      // 6. Send successful response (no need to return deleted meal)
      res.status(200).json({ message: "Meal deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  //update diet status
  const updateDietStatus = async (req, res) => {
    try {
      // 1. Extract diet data from request body
      const dietStatuses = req.body; // Array of objects [{ mealId, isDone }, ...]
  
      // 2. Validate data types (optional)
      for (const { mealId, isDone } of dietStatuses) {
        if (typeof mealId !== 'string' || typeof isDone !== 'boolean') {
          return res.status(400).json({ message: "Invalid diet data format" });
        }
      }
  
      // 3. Extract user ID and today's date
      const userId = req.user._id; // Assuming you have user ID in req.user object
      const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
  
      // 4. Update diets (user only)
      const updatePromises = dietStatuses.map(async ({ mealId, isDone }) => {
        if (req.user.role !== "user") { // Restrict updates to users only
          return res.status(403).json({ message: "Unauthorized operation" });
        }
  
        const dietToUpdate = await Dietplan.findOneAndUpdate(
          {
            user_id: userId,
            date, // Filter by user ID and today's date
            "meals._id": mealId, // Nested query to find meal by ID in meals array
          },
          { $set: { "meals.$[meal].isDone": isDone } }, // Update isDone using update operator
          { arrayFilters: [{ "meal._id": mealId }] } // Filter to match specific meal
        );
  
        // No need to track updated count here (optional)
      });
  
      await Promise.all(updatePromises); // Wait for all update operations to complete
  
      // 5. Send successful response
      res.status(200).json({ message: "Diet statuses updated successfully" });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Internal server error" });
    }
  };
  


  module.exports={createDietplan,updateDiet,deleteDiet,updateDietStatus,getAllDiet,getDietToday}