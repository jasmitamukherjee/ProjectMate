const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
 
  verificationToken: String,
  interested: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  recievedLikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  projectImages: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
 keywords: [
    {
      type: String, //Array of string for keywords
    },
  ],
  lookingFor: [
    {
      type: String, // Array of strings for what they are looking for in their project mate
    },
  ],
});


const User = mongoose.model("User",userSchema);

module.exports = User