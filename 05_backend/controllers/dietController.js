// import all the necessary dependencies
const Dietplan = require("../models/DietPlans");
const Subscription= require("../models/Subscription")
const {
    dietNameValidator,
    quantityValidator,
    caloriesValidator,
    measurementValidator,
    timeToEatValidator,
} = require("../dependencies/validator/Diet");

const mongoose = require("mongoose");

//getAllDiet
const getAllDiet = async (req, res) => {
    try {
      // Get user ID from middleware
      const userId = req.user._id.toString();

      let dietToReturn = {}; // Final object to return
  
      // Handle user role
      if (req.user.role === 'user') {
        // Get all diets created by user
        const userDiets = await Dietplan.find({ user_id: new mongoose.Types.ObjectId(userId) }, { trainer_id: 0 });

        // initiliaze dietToReturn object with meal array
        let dietToReturn = {
          meals: []
      };
      
      // push the meal details in dietToReturn
      userDiets.forEach(diet => {
          diet.meals.forEach(meal => {
            let new_meal={diet_name: meal.diet_name,
            quantity: meal.quantity,
            measurement:meal.measurement,
            calories: meal.calories,
            time_toEat: meal.time_toEat,
            isDone: meal.isDone,
            _id: meal._id,
            date: diet.date
          }

              dietToReturn.meals.push(new_meal);
          });
      });

      // reverse the dietToReturn to sort in decreasing date
      dietToReturn.meals.reverse()
      
      res.status(200).json(dietToReturn);
      } else if (req.user.role === 'trainer') {

        // Get all diets created by the trainer
        const userDiets = await Dietplan.find({ trainer_id: new mongoose.Types.ObjectId(userId) });

        // initialize the dietToReturn object with meal aray
         let dietToReturn = {
          meals: []
      };
      
      // push meals in dietToReturn
      userDiets.forEach(diet => {
          diet.meals.forEach(meal => {
            let new_meal={diet_name: meal.diet_name,
            quantity: meal.quantity,
            calories: meal.calories,
            measurement:meal.measurement,
            time_toEat: meal.time_toEat,
            isDone: meal.isDone,
            _id: meal._id,
            date: diet.date
          }

              dietToReturn.meals.push(new_meal);
          });
      });

      // reverse the meals to get them in datewise order
      dietToReturn.meals.reverse()

      // send the response
      res.status(200).json(dietToReturn);


      } else {
        // show error if anything happens in between the code
        res.status(400).json({ message: "Invalid user role" });
      }
      // res.status(200).json(dietToReturn);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

// create meal
const createDietplan = async (req, res) => {
    try {
    //  Extract meal data from request body
      const  meals  = req.body;
  
      // Validate meal data (assuming you have validator functions)
      const validMeals = meals.filter((meal) => {
        const { diet_name, quantity,measurement, calories, time_toEat } = meal;
        if(
          dietNameValidator(diet_name) &&
          quantityValidator(quantity) &&
          measurementValidator(measurement)&&
          caloriesValidator(calories) &&
          timeToEatValidator(time_toEat)
        )
          {
            // return if validation is successful
            return { diet_name, quantity,measurement, calories, time_toEat }
          }
          else{
            // return if validation fails
            return res.status(400).json({ message: "Invalid exercise data" });
          }
        
      });
  
  
      //  Extract user ID and get today's date
      const userId = req.user._id; 
      const date = new Date().toISOString().slice(0,10);
  
      // Find existing dietplan (based on user role)
      let prevDietplan;
      if (req.user.role === "user") {
        prevDietplan = await Dietplan.findOne({ user_id: userId, date });
      } else if (req.user.role === "trainer") {
        prevDietplan = await Dietplan.findOne({ trainer_id: userId, date });
      } else {
        return res.status(400).json({ message: "Invalid user role" });
      }
  
      // Update existing dietplan or create a new one
      if (prevDietplan) {
        prevDietplan.meals.push(...validMeals);
      } else {
        prevDietplan = new Dietplan({
          [req.user.role === "user" ? "user_id" : "trainer_id"]: userId,
          meals: validMeals,
          date,
        });
      }
  
      // Save the dietplan update or create
      const savedDietplan = await prevDietplan.save();

     //save the trainer exercise in all the user's exercise array
    if(req.user.role==='trainer'){

      // Find active subscriptions for the user
      const activeSubscriptions = await Subscription.find({
        trainer_id: userId  
      });
  
      // Extract trainer IDs from active subscriptions
      const userIds = activeSubscriptions.map((subscription) => subscription.user_id);
      console.log(userIds)
      const newDate= new Date(date);

      // Fetch exercises from trainers 
      const userExercise = await Promise.all(
        userIds.map(async (user_Id) => {
          let user_object= new mongoose.Types.ObjectId(user_Id.toString())
          let diet_array= await Dietplan.findOne({user_id: user_object,date:newDate} );
          if(diet_array){
            diet_array.meals.push(...validMeals)
          }
          else{
            diet_array = new Dietplan({
              user_id: user_Id,
              meals: validMeals,
              date,
            });
          }
          const savedDietUser=await diet_array.save();
  
          console.log(savedDietUser)
        })
      );
      }
  
      // Send successful response with saved dietplan
      res.status(201).json(savedDietplan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

//get Todays diet
const getDietToday = async (req, res) => {
    try {
      // Get user ID and today's date in YYYY-MM-DD format
      const userId = req.user._id.toString();
      const date = new Date().toISOString().slice(0, 10);
      let dietToReturn = {};
  
      // if the role is user 
      if (req.user.role === 'user') {

        // Get diet plan created by user
        const userDietPlan = await Dietplan.findOne({ user_id: userId, date });
  
        // Find active subscriptions for the user
        const activeSubscriptions = await Subscription.find({ user_id: userId });
  
        // Extract trainer IDs from active subscriptions
        const trainerIds = activeSubscriptions.map(
          (subscription) => subscription.trainer_id
        );
  
        // Fetch diet plans from trainers 
        const trainerDietPlans = await Promise.all(
          trainerIds.map(async (trainerId) => {
            return await Dietplan.findOne({ trainer_id: trainerId, date });
          })
        );
  
        // Combine diet plans from user and trainers
        dietToReturn = {
          userDietPlan: userDietPlan || null,
          trainerDietPlans: trainerDietPlans.filter(Boolean), 
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
  
      // send the response
      res.status(200).json(dietToReturn);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  //update diet
  const updateDiet = async (req, res) => {
    try {
    //  Extract meal data and ID from request body
      const { mealId, ...mealData } = req.body;
      const { diet_name, quantity, calories, time_toEat } = mealData;
  
      // Validate meal data 
      if (
        !dietNameValidator(diet_name) ||
        !quantityValidator(quantity) ||
        !caloriesValidator(calories) ||
        !timeToEatValidator(time_toEat)
      ) {
        // return if meal info is invalid
        return res.status(400).json({ message: "Invalid meal data" });
      }
  
      // Extract userID and get today's date
      const userId = req.user._id;
      const date = new Date().toISOString().slice(0, 10);
  
      // Find the diet plan to update based on role
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
  
      // Check if diet plan exists and handle errors
      if (!dietPlanToUpdate) {
        // if diet plan not found then return error message
        return res.status(404).json({ message: "Diet plan not found" });
      }
  
      //  Update the meal based on user role 
      const updatedMeals = dietPlanToUpdate.meals.map((meal) => {
        if (meal._id.toString() === mealId) {
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
  
      // Save the updated diet plan
      const savedDietPlan = await dietPlanToUpdate.save();
  
      // Send successful response with saved diet plan
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
      // Extract meal ID from request params
      const mealId = req.query.id;
  
      // Extract user ID and today's date
      const userId = req.user._id;
      const date = new Date().toISOString().slice(0, 10);
  
      // Find and potentially update the diet plan 
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
  
      // Check if diet plan exists and handle errors
      if (!updatedDietPlan) {
        return res.status(404).json({ message: "Diet plan not found" });
      }
  
      // console.log("updatedDietPlan:", updatedDietPlan);
      // res.status(200).json(updatedDietPlan); //return updated document 
  
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
      // Extract diet data from request body
      const dietStatuses = req.body; 
  
    // Validate data types 
      for (const { mealId, isDone } of dietStatuses) {
        if (typeof mealId !== 'string' || typeof isDone !== 'boolean') {
          return res.status(400).json({ message: "Invalid diet data format" });
        }
      }
  
      // Extract user ID and get today's date
      const userId = req.user._id; 
      const date = new Date().toISOString().slice(0, 10); 

      // Update diets (user only)
      const updatePromises = dietStatuses.map(async ({ mealId, isDone }) => {
        // Restrict updates to users only
        if (req.user.role !== "user") { 
          return res.status(403).json({ message: "Unauthorized operation" });
        }
  
        // Filter by user ID and today's date
        const dietToUpdate = await Dietplan.find(
          {
            user_id: userId,
            date, 
          }
        );
        // update the info
          dietToUpdate[0].meals.map((meal)=>{
            if(meal._id.toString()===mealId){
              meal.isDone=isDone
            }
          })
  
          // save the changes made
          const updatedSuccessfull=await dietToUpdate[0].save()
        
      });
     // Wait for all update operations to complete
      await Promise.all(updatePromises); 
  
      //  Send successful response
      res.status(200).json({ message: "Diet statuses updated successfully" });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Internal server error" });
    }
  };
  


  module.exports={createDietplan,updateDiet,deleteDiet,updateDietStatus,getAllDiet,getDietToday}