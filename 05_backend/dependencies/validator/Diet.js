// Validator function for diet_name
function dietNameValidator(dietName) {
    if (typeof dietName !== 'string' || dietName.trim().length === 0) {
      return false;
    }
    return true;
  }
  
  // Validator function for quantity
  function quantityValidator(quantity) {
    if (typeof quantity !== 'number' || quantity < 0) {
      return false;
    }
    return true;
  }
  
  // Validator function for calories
  function caloriesValidator(calories) {
    if (typeof calories !== 'number' || calories < 0) {
      return false;
    }
    return true;
  }
  
  // Validator function for time_toEat
  function timeToEatValidator(timeToEat) {
    const allowedTimes = ['morning', 'evening', 'night'];
    if (!allowedTimes.includes(timeToEat)) {
      return false;
    }
    return true;
  }
  
  module.exports = {
    dietNameValidator,
    quantityValidator,
    caloriesValidator,
    timeToEatValidator,
  };