// Validator function for name
function nameValidator(name) {
    // Check if name is a string
    if (typeof name !== "string") {
      return false;
    }
  
    // Check if name is not empty
    if (name.trim().length === 0) {
      return false;
    }
  
    // Check if name length is between 2 and 50 characters
    if (name.length < 2 || name.length > 50) {
      return false;
    }
  
    // Check if name contains only alphabets and spaces
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      return false;
    }
    
   
    return true;
  }
  
  // Validator function for email
  function emailValidator(email) {
    // Check if email is a string
    if (typeof email !== "string") {
      return false;
    }
  
    // Check if email is not empty
    if (email.trim().length === 0) {
      return false;
    }
  
    // Check for email format using regular expression
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return false;
    }
  
    // Check if email length is between 6 and 255 characters
    if (email.length < 6 || email.length > 255) {
      return false;
    }
    
    return true;
  }
  
  // Validator function for password
  function passwordValidator(password) {
    // Check if password is a string
    if (typeof password !== "string") {
      return false;
    }
  
    // Check if password is not empty
    if (password.trim().length === 0) {
      return false;
    }
  
    // Check if password length is between 6 and 20 characters
    if (password.length < 6 || password.length > 20) {
      return false;
    }
  
    
    
    return true;
  }
  
  // Validator function for phone_number
  function phoneNumberValidator(phoneNumber) {
    // Check if phoneNumber is a string
    if (typeof phoneNumber !== "string") {
      return false;
    }
  
    // Check if phoneNumber is not empty
    if (phoneNumber.trim().length === 0) {
      return false;
    }
  
    
    console.log("working")
    return true;
  }
  
  // Validator function for role
  function roleValidator(role) {
    // Check if role is a string
    if (typeof role !== "string") {
      return false;
    }
  
    // Check if role is either 'user' or 'trainer'
    if (role !== "user" && role !== "trainer") {
      return false;
    }
  
    return true;
  }
  
  // Validator function for image
  function imageValidator(image) {
    // Check if image is a string or null
    if (typeof image !== "string" && image !== null) {
      return false;
    }
  
  
    return true;
  }
  
  // Validator function for banner
  function bannerValidator(banner) {
    // Check if banner is a string or null
    if (typeof banner !== "string" && banner !== null) {
      return false;
    }
  
   
  
    return true;
  }
  
  // Validator function for description
  function descriptionValidator(description) {
    // Check if description is a string or null
    if (typeof description !== "string" && description !== null) {
      return false;
    }
  
    // Check if description length is between 10 and 500 characters
    if (description && (description.length < 10 || description.length > 500)) {
      return false;
    }
  
    return true;
  }
  
  // Validator function for trainer_speciality
function trainerSpecialityValidator(trainerSpeciality) {
    // List of allowed trainer specialities
    const allowedSpecialities = [
      "strength-and-conditioning",
      "yoga",
      "pilates",
      "cardio",
      "dance",
      "martial-arts",
      "nutrition",
      "mindfulness",
      "mobility",
      "prenatal-and-postnatal",
    ];
   
  
    // Check if trainerSpeciality is a string or null
    if (typeof trainerSpeciality !== "string" && trainerSpeciality !== null) {
      return false;
    }
  
    // Check if trainerSpeciality is empty
    if (trainerSpeciality === "") {
      return false;
    }
  
    // Check if trainerSpeciality is one of the allowed values
    if (!allowedSpecialities.includes(trainerSpeciality)) {
      return false;
    }
  
    return true;
  }
  
  // Validator function for price
  function priceValidator(price) {
    // Check if price is a number
    if (typeof price !== "number") {
      return false;
    }
  
    // Check if price is non-negative
    if (price < 0) {
      return false;
    }
  
    return true;
  }
  
  // Validator function for validity_days
  function validityDaysValidator(validityDays) {
    // Check if validityDays is a number
    if (typeof validityDays !== "number") {
      return false;
    }
  
    // Check if validityDays is a positive integer
    if (validityDays < 1 || !Number.isInteger(validityDays)) {
      return false;
    }
  
    // Check if validityDays is within a valid range (e.g., between 7 and 365)
    if (validityDays < 7 || validityDays > 365) {
      return false;
    }
  
    return true;
  }
  
  module.exports = {
    nameValidator,
    emailValidator,
    passwordValidator,
    phoneNumberValidator,
    roleValidator,
    imageValidator,
    bannerValidator,
    descriptionValidator,
    trainerSpecialityValidator,
    priceValidator,
    validityDaysValidator,
  };