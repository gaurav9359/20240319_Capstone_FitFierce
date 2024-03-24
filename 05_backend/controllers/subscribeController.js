const mongoose = require('mongoose');
const Subscription = require('../models/Subscription');
const User = require('../models/User');

const subscribePlan = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const trainerId = req.query.trainerId.toString();

    if(req.user.role==='trainer'){
        return res.status(400).json({message: "you are not authorized to perform this operation"})
    }

    // Find the user and trainer documents
    const user = await User.findById(new mongoose.Types.ObjectId(userId));
    const trainer = await User.findById(new mongoose.Types.ObjectId(trainerId));

    if (!user || !trainer) {
      return res.status(404).json({ message: 'User or trainer not found' });
    }

    // Check if the user already has a subscription with the trainer
    const existingSubscription = await Subscription.findOne({
      user_id: userId,
      trainer_id: trainerId,
    });

    // Find the validity days for the trainer
    const validityDays = trainer.validity_days;

    if (existingSubscription && new Date().toISOString().slice(0,10)<=existingSubscription.end_date.toISOString().slice(0,10)) {
        return res.status(400).json({ message: 'Subscription already exists' });
    
    }
    else if(existingSubscription && new Date().toISOString().slice(0,10)>existingSubscription.end_date.toISOString().slice(0,10)){
        // Calculate the start and end dates
    let startDate = new Date()
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + validityDays);
    endDate=endDate.toISOString().slice(0,10)
    startDate=startDate.toISOString().slice(0,10)
        updated_data={
            start_date: startDate,
            end_date: endDate
        }

        const updated_document= await Subscription.findOneAndUpdate({
            user_id: userId,trainer_id: trainerId
        },updated_data, { upsert: false , new: true })

        return res.status(200).json({message: updated_document})
    }

    

    // Calculate the start and end dates
    let startDate = new Date()
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + validityDays);
    endDate=endDate.toISOString().slice(0,10)
    startDate=startDate.toISOString().slice(0,10);
    // Create a new subscription document
    const newSubscription = new Subscription({
      user_id: userId,
      trainer_id: trainerId,
      start_date: startDate,
      end_date: endDate,
    });

    // Save the subscription document
    const savedSubscription = await newSubscription.save();

    // Add the trainer ID to the user's subscribed_plans array
    user.subscribed_plans.push(trainerId);
    await user.save();

    res.status(201).json(savedSubscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports={subscribePlan}