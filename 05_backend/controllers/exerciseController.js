// import all the necessary dependencies
const Exercise = require("../models/ExercissePlans");
const Subscription= require("../models/Subscription")
const {
  exerciseNameValidator,
  categoryValidator,
  setsValidator,
  estimatedTimeValidator,
} = require("../dependencies/validator/Exercise");

const mongoose = require("mongoose");

// Get all exercises
const getAllExercises = async (req, res) => {
    try {
      // Get user ID
      const userId = req.user._id.toString();

      // Final object to return
      let exerciseToReturn = {}; 

      // Handle user role
      if (req.user.role === 'user') {

        // Get all exercises created by user
        const userExercises = await Exercise.find({ userid: userId }, { trainer_id: 0 });
  
        // initialize the exercise to return object with array 
        let exerciseToReturn={
          exercises:[]
        }

        // push exercise in exerciseToReturn->exercises
        userExercises.forEach(exercise => {
          exercise.exercises.forEach(exercise1 => {
            let new_exercise={exercise_name: exercise1.exercise_name,
            category: exercise1.category,
            sets: exercise1.sets,
            reps:exercise1.reps,
            estimated_time: exercise1.estimated_time,
            isDone: exercise1.isDone,
            _id: exercise1._id,
            date: exercise.date
          }
              exerciseToReturn.exercises.push(new_exercise);
          });
      });

       // Reverse the order of exercises before returning to sort according to date
       exerciseToReturn.exercises.reverse();

      res.status(200).json(exerciseToReturn);
        // console.log(exerciseToReturn)
      } else if (req.user.role === 'trainer') {
        // Get all exercises created by the trainer
        const userExercise = await Exercise.find({ trainer_id: new mongoose.Types.ObjectId(userId)});

        // initialize the exerciseToReturn object with array 
        let exerciseToReturn={
          exercises:[]
        }
        // console.log(userExercise)
        userExercise.forEach(exercise => {
          exercise.exercises.forEach(exercise1 => {
            let new_exercise={exercise_name: exercise1.exercise_name,
            category: exercise1.category,
            sets: exercise1.sets,
            reps:exercise1.reps,
            estimated_time: exercise1.estimated_time,
            isDone: exercise1.isDone,
            _id: exercise1._id,
            date: exercise.date
          }
              exerciseToReturn.exercises.push(new_exercise);
          });
      });

      // Reverse the order of exercises before returning
      exerciseToReturn.exercises.reverse();
      // console.log(exerciseToReturn)

      res.status(200).json(exerciseToReturn);
      } else {
        res.status(400).json({ message: "Invalid user role" });
      }
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  

const getExerciseToday = async (req, res) => {
  try {

    // Get user ID and get today's date in YYYY-MM-DD format
    const userId = req.user._id.toString();
    const date = new Date().toISOString().slice(0, 10);

    // Final object to return
    let exerciseToReturn = {}; 

    // Handle user role
    if (req.user.role === 'user') {
      // Get exercises created by user
      const userExercises = await Exercise.find({ userid:userId, date:date });

      // console.log(userId)
      // Find active subscriptions for the user
      const activeSubscriptions = await Subscription.find({
        user_id: userId
      });

      // console.log(activeSubscriptions)

      // Extract trainer IDs from active subscriptions
      const trainerIds = activeSubscriptions.map((subscription) => subscription.trainer_id);

      // console.log(trainerIds)

      // Fetch exercises from trainers 
      const trainerExercises = await Promise.all(
        trainerIds.map(async (trainerId) => {
          return await Exercise.find({ trainer_id:trainerId, date:date });
        })
      );
        // console.log(trainerExercises)

      // Combine exercises from user and trainers
      exerciseToReturn = {
        userExercises: userExercises,
        trainerExercises: [].concat(...trainerExercises), // Flatten array
      };

      // console.log(exerciseToReturn)
    } else if (req.user.role === 'trainer') {
      // Trainer can only see exercises created by themselves
      const userExercise = await Exercise.findOne({ trainerId: userId, date });
      exerciseToReturn = userExercise;

    } else {
      res.status(400).json({ message: "Invalid user role" });
    }

    res.status(200).json(exerciseToReturn);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
};


const createExercise = async (req, res) => {
  try {
    // Extract exercise data from request body
    const  exercises  = req.body;
    // console.log(exercises)

    // Validate exercise data 
    const validExercises = exercises.filter((exercise) => {
      const { exercise_name, category, sets,reps, estimated_time } = exercise;
      if(
        exerciseNameValidator(exercise_name) &&
        categoryValidator(category) &&
        setsValidator(sets) &&
        estimatedTimeValidator(estimated_time)
      ){
        // if validation fails then return this
        return { exercise_name, category, sets,reps, estimated_time }
      }
      else{
        return res.status(400).json({ message: "Invalid exercise data" });
      }
    });

    // Extract user ID and today's date
    const userId = req.user._id; 

    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

    //  Find existing exercise based on user role
    let prevExercise;
    if (req.user.role === "user") {
      // console.log("work1")
      prevExercise = await Exercise.findOne({ userid: userId, date });
    } else if (req.user.role === "trainer") {
      prevExercise = await Exercise.findOne({ trainer_id: userId, date });
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }
    // console.log(...validExercises)

    // Update existing exercise or create a new one
    if (prevExercise) {
      prevExercise.exercises.push(...validExercises);
    } else {
      prevExercise = new Exercise({
        [req.user.role === "user" ? "userid" : "trainer_id"]: userId,
        exercises: validExercises,
        date,
      });
    }

    //Save the exercise (update or create)
    console.log("work2")
    const savedExercise = await prevExercise.save();
    console.log(savedExercise)

    //save the trainer exercise in all the user's exercise array
    if(req.user.role==='trainer'){
    // Find active subscriptions for the user
    const activeSubscriptions = await Subscription.find({
      trainer_id: userId  // Replace with a dynamic trainer ID if needed
    });

    // Extract trainer IDs from active subscriptions
    const userIds = activeSubscriptions.map((subscription) => subscription.user_id);
    // console.log(userIds)
    const newDate= new Date(date);

    // Fetch exercises from trainers
    const userExercise = await Promise.all(
      userIds.map(async (user_Id) => {
        let user_object= new mongoose.Types.ObjectId(user_Id.toString())
        let exercise_array= await Exercise.findOne({userid: user_object,date:newDate} );
        // console.log(exercise_array)
        if(exercise_array){
          exercise_array.exercises.push(...validExercises)
        }
        else{
          exercise_array = new Exercise({
            userid: user_Id,
            exercises: validExercises,
            date,
          });
        }

        const savedExerciseUser=await exercise_array.save();

        // console.log(savedExerciseUser)
      })
    );
    }

    // 7. Send successful response with saved exercise
    res.status(201).json(savedExercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const updateExercise = async (req, res) => {
  try {
    // 1. Extract exercise data and ID from request body
    const { exerciseId, ...exerciseData } = req.body; // Destructure exercise data and ID
    const { exercise_name, category, sets, estimated_time } = exerciseData; // Optional: Destructure updated exercise fields (if applicable)

    // 2. Validate exercise data (if updating specific fields)
    if (
      !exerciseNameValidator(exercise_name) ||
      !categoryValidator(category) ||
      !setsValidator(sets) ||
      !estimatedTimeValidator(estimated_time)
    ) {
      return res.status(400).json({ message: "Invalid exercise data" });
    }

    // 3. Extract user ID and today's date
    const userId = req.user._id; // Assuming you have user ID in req.user object
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

    // 4. Find the exercise to update (based on user role)
    let exerciseToUpdate;
    if (req.user.role === "user") {
      exerciseToUpdate = await Exercise.findOne({
        userid: userId,
        date,
        "exercises._id": exerciseId, // Use nested query to find exercise by ID in exercises array
      });
    } else if (req.user.role === "trainer") {
      exerciseToUpdate = await Exercise.findOne({
        trainer_id: userId,
        date,
        "exercises._id": exerciseId, // Use nested query to find exercise by ID in exercises array
      });
    } else {
      return res.status(400).json({ message: "Invalid user role" }); // Handle invalid role
    }

    // 5. Check if exercise exists and handle errors
    if (!exerciseToUpdate) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    // 6. Update the exercise (based on user role and update approach)
    const updatedExercises = exerciseToUpdate.exercises.map((exercise) => {
      if (exercise._id.toString() === exerciseId) {
        // Check if exercise IDs match
        // Update specific fields if provided in the request body
        return {
          ...exercise, // Spread existing exercise properties
          ...(exercise_name ? { exercise_name } : {}), // Update exercise_name if provided
          ...(category ? { category } : {}), // Update other fields similarly (if applicable)
          ...(sets ? { sets } : {}),
          ...(estimated_time ? { estimated_time } : {}),
        };
      }
      return exercise; // Keep other exercises unchanged
    });

    exerciseToUpdate.exercises = updatedExercises;

    // 7. Save the updated exercise
    const savedExercise = await exerciseToUpdate.save();

    // 8. Send successful response with saved exercise
    res.status(200).json(savedExercise); // 200 OK for updates
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an exercise
const deleteExercise = async (req, res) => {
  try {
    // 1. Extract exercise ID from request params
    const exerciseId = req.query.id;
    console.log(exerciseId);

    // 2. Extract user ID and today's date
    const userId = req.user._id; // Assuming you have user ID in req.user object
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
    
    // 3. Find and potentially update the exercise (based on user role)
    let updatedExercise;
    if (req.user.role === "user") {
      const updatedExercise = await Exercise.findOneAndUpdate(
        { userid: userId, date:date },
        { $pull: { exercises: { _id: new mongoose.Types.ObjectId(exerciseId) } } } // Use $pull for deletion within array
      );
      console.log(updatedExercise);
    } else if (req.user.role === "trainer") {
        updatedExercise = await Exercise.findOneAndUpdate(
            { trainer_id: userId, date },
            { $pull: { exercises: { _id:exerciseId } } } // Ensure correct ID type
          );
      console.log(updatedExercise);
    } else {
      return res.status(400).json({ message: "Invalid user role" }); // Handle invalid role
    }

    // 4. Check if exercise exists and handle errors
    if (!updatedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    // 5. Debugging and optional response with updated exercise
    console.log("updatedExercise:", updatedExercise); // Optional logging for verification
    // res.status(200).json(updatedExercise); // Optional: return updated document if needed

    // 6. Send successful response (no need to return deleted exercise)
    res.status(200).json({ message: "Exercise deleted successfully" }); // 200 OK for successful deletion
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateStatus=async (req,res)=>{
  try {
    //Extract exercise data from request body
    const exerciseStatuses  = req.body; 

    // validation of data recieved
    for (const { exerciseId, isDone } of exerciseStatuses) {
      if (typeof exerciseId !== 'string' || typeof isDone !== 'boolean') {
        return res.status(400).json({ message: "Invalid exercise data format" });
      }
    }

    //Extract user ID and today's date
    const userId = req.user._id; 
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

    // 4. Update exercises for user only
    const updatePromises = exerciseStatuses.map(async ({ exerciseId, isDone }) => {
      if (req.user.role !== "user") { 
        return res.status(403).json({ message: "Unauthorized operation" });
      }

      const exerciseToUpdate = await Exercise.find(
        {
          userid: userId,
          date, 
        }
      );

      // console.log(exerciseToUpdate)
        exerciseToUpdate[0].exercises.map((exercise)=>{
          if(exercise._id.toString()===exerciseId){
            exercise.isDone=isDone
          }
        })

        const updatedSuccessfull=await exerciseToUpdate[0].save()
      

      // No need to track updated count here (optional)
    });

    await Promise.all(updatePromises); // Wait for all update operations to complete


    // 5. Send successful response
    res.status(200).json({ message: "Exercise statuses updated successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllExercises,
  getExerciseToday,
  createExercise,
  updateExercise,
  updateStatus,
  deleteExercise,
};
