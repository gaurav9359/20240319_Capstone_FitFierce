const Exercise = require("../models/ExercissePlans");
const {
  exerciseNameValidator,
  categoryValidator,
  setsValidator,
  estimatedTimeValidator,
} = require("../dependencies/validator/Exercise");

const mongoose = require("mongoose");

// Get all exercises
const getAllExercises = async (req, res) => {
  let responseToSend = {};
  // Check if user role is "user"
  if (req.user.role === "user") {
    // Filter exercises based on user ID
    const exercisesUser = await Exercise.find({ userid: req.user._id });
    const exerciseTrainer = await Exercise.find({
      trainer_id: { $in: req.user.subscribed_plans },
    });
    console.log(exercisesUser);
    console.log(req.user._id);
    console.log(exerciseTrainer);
    console.log(req.user);
    //
  }
  //   try {
  //     res.status(200).json(req.user)
  //     const exercises = await Exercise.find();
  //     res.status(200).json(exercises);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
};

const getExerciseToday = async (req, res) => {
    try {
      const userId = req.user._id;
      const date = new Date().toISOString().slice(0, 10);
  
      const query = req.user.role === 'user'
        ? { userid: userId, date }
        : { trainer_id: userId, date};
  
      const exerciseToReturn = await Exercise.findOne(query);
  
      if (!exerciseToReturn) {
        return res.status(404).json({ message: 'Exercise not found' });
      }
  
      res.status(200).json(exerciseToReturn);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  


const createExercise = async (req, res) => {
  try {
    // 1. Extract exercise data from request body
    const { exercise_name, category, sets, estimated_time } = req.body;

    // 2. Validate exercise data (assuming you have validator functions)
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

    // 4. Find existing exercise (based on user role)
    let prevExercise;
    if (req.user.role === "user") {
      prevExercise = await Exercise.findOne({ userid: userId, date: date }); // Use userId for user role
    } else if (req.user.role === "trainer") {
      prevExercise = await Exercise.findOne({ trainer_id: userId, date: date }); // Use trainer_id for trainer role
    } else {
      return res.status(400).json({ message: "Invalid user role" }); // Handle invalid role
    }
    console.log(prevExercise);

    // 5. Update existing exercise or create a new one
    if (prevExercise) {
      prevExercise.exercises.push({
        exercise_name,
        category,
        sets,
        estimated_time,
      });
    } else {
      prevExercise = new Exercise({
        [req.user.role === "user" ? "userId" : "trainer_id"]: userId, // Dynamic assignment based on role
        exercises: [{ exercise_name, category, sets, estimated_time }],
        date,
      });
    }

    // 6. Save the exercise (update or create)
    const savedExercise = await prevExercise.save();

    // 7. Send successful response with saved exercise
    res.status(201).json(savedExercise);
  } catch (error) {
    console.error(error); // Log the error for debugging
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
        { $pull: { exercises: { _id: mongoose.Types.ObjectId(exerciseId) } } } // Use $pull for deletion within array
      );
      console.log(updatedExercise);
    } else if (req.user.role === "trainer") {
        exerciseToDelete = await Exercise.findOneAndUpdate(
            { trainer_id: userId, date },
            { $pull: { exercises: { _id: mongoose.Types.ObjectId(exerciseId) } } } // Ensure correct ID type
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

module.exports = {
  getAllExercises,
  getExerciseToday,
  createExercise,
  updateExercise,
  deleteExercise,
};
