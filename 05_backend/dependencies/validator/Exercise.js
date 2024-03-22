// Validator function for exercise_name
function exerciseNameValidator(exerciseName) {
    if (typeof exerciseName !== 'string' || exerciseName.trim().length === 0) {
      return false;
    }
    return true;
  }
  
  // Validator function for category
  function categoryValidator(category) {
    const allowedCategories = [
      'strength-and-conditioning',
      'yoga',
      'pilates',
      'cardio',
      'dance',
      'martial-arts',
      'zumba',
      'mindfulness',
      'mobility',
      'prenatal-and-postnatal',
    ];
    if (!allowedCategories.includes(category)) {
      return false;
    }
    return true;
  }
  
  // Validator function for sets
  function setsValidator(sets) {
    if (typeof sets !== 'number' || sets < 1) {
      return false;
    }
    return true;
  }
  
  // Validator function for estimated_time
  function estimatedTimeValidator(estimatedTime) {
    if (typeof estimatedTime !== 'string' || estimatedTime.trim().length === 0) {
      return false;
    }
    return true;
  }
  
  module.exports = {
    exerciseNameValidator,
    categoryValidator,
    setsValidator,
    estimatedTimeValidator,
  };