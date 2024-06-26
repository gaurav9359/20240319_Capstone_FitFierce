// get all the dependencies
const mongoose= require('mongoose')
const User = require('../models/User')

const {
    nameValidator,
    emailValidator,
    phoneNumberValidator,
    imageValidator,
    bannerValidator,
    descriptionValidator,
    trainerSpecialityValidator,
    priceValidator,
    validityDaysValidator,
}= require("../dependencies/validator/User");
const Subscription = require('../models/Subscription');


//get user 
const getUser=async (req,res)=>{
    try{
    // get userid from middleware
    const userId = req.user._id;
    let subscribed_plans=req.user.subscribed_plans;
    let subscribed_info=[]

    // to send the info of subscription user have purchased
    for(let trainerId of subscribed_plans){
        let trainerInfo={}
        console.log(trainerId)
        let trainer=await User.findOne({_id: new mongoose.Types.ObjectId(trainerId)})
        trainerInfo.trainer_name=trainer.name
        trainerInfo.image=trainer.image
        trainerInfo.speciality=trainer.trainer_speciality
        trainerInfo.price= trainer.price
        trainerInfo.validity_days= trainer.validity_days

        subscribed_info.push(trainerInfo)
    }
    // console.log(subscribed_info)
 
    let response;
    // if role is user then send all the profile info and subscrbed plans details
    if (req.user.role === 'user') {
      response = {
        id: userId,
        name:req.user.name,
        email: req.user.email,
        phone_number: req.user.phone_number,
        role: req.user.role,
        subscribed_plans: subscribed_info,
      };
    } else if (req.user.role === 'trainer') {
      // if the role is trainer then only send necessary profile info
      response = {
        id: userId,
        name:req.user.name,
        email: req.user.email,
        phone_number: req.user.phone_number,
        role: req.user.role,
        image: req.user.image,
        banner: req.user.banner,
        description: req.user.description,
        trainer_speciality: req.user.trainer_speciality,
        price: req.user.price,
        validity_days: req.user.validity_days
      };
    } else {
      return res.status(400).json({ message: 'Invalid user role' });
    } 

    // send response
    res.status(200).json(response);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}

}

//update userinfo
const updateUser=async (req,res)=>{
    //  Extract user data from request body
    const { name, email, phone_number} = req.body;

    // Validate user data (optional)
    if (
        !nameValidator(name) ||
        !emailValidator(email) ||
        !phoneNumberValidator(phone_number) 
      ) {
        // if the validation fails then return error with message
        return res.status(400).json({ message: 'Invalid input' });
      }

    //if the role is user
    if(req.user.role==='user'){
        let updatedData={
            name: name,
            email: email,
            phone_number: phone_number
        }

        // if the user is not found then return error
        try{
            const updatedUser= await User.findByIdAndUpdate(req.user._id,updatedData,{new:true})
        }
        catch(error){
            res.status(500).json({message: error})
        }
        res.status(200).json({newdata:{updatedData}})
    }
    // if the role is trainer
    else if(req.user.role==="trainer"){

        //take information from req.body
        const { name, email, phone_number,image,banner,description,trainer_speciality,price,validity_days} = req.body;

        // validate for extra fields
        if (
            !imageValidator(image) ||
            !bannerValidator(banner) ||
            !descriptionValidator(description) ||
            !trainerSpecialityValidator(trainer_speciality) ||
            !priceValidator(price) ||
            !validityDaysValidator(validity_days)
          ) {
            // if validation fails return error
            return res.status(400).json({ message: 'Invalid input' });
          }

          // format updated data and store it in updatedData
          let updatedData={
            name: name,
            email: email,
            phone_number: phone_number,
            image:image,
            banner:banner,
            description:description,
            trainer_speciality:trainer_speciality,
            price:price,
            validity_days:validity_days,
          }

        // update the data if any error occurs then return the message
        try{
            const updatedUser= await User.findByIdAndUpdate(req.user._id,updatedData,{new:true})
        }
        catch(error){
            res.status(500).json({message: error})
        }
        res.status(200).json({newdata:{updatedData: updatedData}})

    }

}

const getallTrainer=async (req,res)=>{
  try {
    // get all the trainer's necessary information
    const trainers = await User.find({ role: 'trainer' }, {_id:1, image: 1, name: 1, trainer_speciality: 1, price: 1 });

    // console.log(trainers)
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const getTrainerById=async (req,res)=>{
  // console.log("here")
  // get the trainer id from query params
  const trainer_id=req.query.id;

  // if the role is trainer then don't allow it
  if(req.user.role!=='user'){
    res.send(500).send({message: "not authorized"})
  }

  try{
    // find the trainer and get it's information
    const trainer_details= await User.findOne({_id:new mongoose.Types.ObjectId(trainer_id)})

    // if the trainer not found then return error
    if(!trainer_details){
      res.send(500).status({message:"trainer not found"})
    }

    // get the count of user subscribed to the trainer
    const subscribedUserCount=await Subscription.find({trainer_id:trainer_id})

    // store all the information to return 
    const detailsToReturn={ _id: trainer_details._id,
      name: trainer_details.name,
      email: trainer_details.email,
      // Include other desired properties from trainer_details
      phone_number: trainer_details.phone_number,
      role: trainer_details.role,
      image: trainer_details.image,
      banner: trainer_details.banner,
      description: trainer_details.description,
      trainer_speciality: trainer_details.trainer_speciality,
      price: trainer_details.price,
      validity_days: trainer_details.validity_days,usersCount:subscribedUserCount.length}

      // send the response
    res.send(detailsToReturn)

  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports={getUser,updateUser,getallTrainer,getTrainerById}
