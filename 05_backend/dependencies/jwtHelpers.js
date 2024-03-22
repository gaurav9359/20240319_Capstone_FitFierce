const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const User = require("../models/User");
const mongoose = require("mongoose");



/** Middleware helper function to verify JWT token
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next function to call
 */
async function verifyJwt(req, res, next) {

    const token = req.headers.authorization?.split(" ")[1];
  
    // If there is no token
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    // Verify token
    try {
      const decoded = await jwt.verify(token, secret);
      // Sets user (ID) in the request object
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
  
  /** helper function to get the user object from it's ID
   */
  async function getUserFromId(userId) {
    const user = await User.find({ _id: userId });
  
    if (!user) {
      return false;
    }
  
    return user[0];
  }
  
  /** Middleware helper function to get and set the user object in request object
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - next function to call
   */
  async function getUserMiddleware(req, res, next) {
    const user = await getUserFromId(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    req.user = user;
    next();
  }
  
  module.exports = { verifyJwt, getUserFromId, getUserMiddleware };