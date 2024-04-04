const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const nodemailer = require("nodemailer")
const app = express();
const port = 5000;
const cors = require("cors");

// const http = require("http").createServer(app);
// const io = require("socket.io")(http);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Chat = require("./models/message");



mongoose.connect("mongodb+srv://jasmitamukherjee4:jasmita@cluster0.xpvzw6u.mongodb.net/").then(()=>{
    console.log("Connected to MongDb")
}).catch((error)=>{
console.log("Error connecting to MongoDb")
})
app.listen(port, () => {
    console.log("Server is running on 5000");
  });

//endpoint to register a user to backend
app.post("/register",async(req,res)=>{
    try {

        const {name,email,password}= req.body;
        //check if email is already registered
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(500).json({message:"User exists already"})
        }
        //create a new user
        const newUser = new User({name,email,password})
        //generate token for verification
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");
        //save suer to backend
        await newUser.save();
        res
      .status(200)
      .json({ message: "User registered successfully", userId: newUser._id });

        //send verification email to registered user
        // sendVerificationEmail(newUser.email,newUser.verificationToken)

        
    } catch (error) {
        console.log("Error registering user",error)
        res.status(500).json({message:"Registration failed"})
        
    }
})

// const sendVerificationEmail= async (email,verificationToken)=>{
//     const transpoter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: "jasmitamukherjee6@gmail.com",
//           pass: "rnzcugnscqtqiefs",
//         },
//       });

// }
const generateSecretKey = ()=>{
    const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;

}
const secretKey = generateSecretKey();

//login endpoint 
app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      //check if the user exists already
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      //check in password is correct
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalide password" });
      }
  
      const token = jwt.sign({ userId: user._id }, secretKey);
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "login failed" });
    }
  });

  //endpoint to change or select the gender for a particular user profile
app.put("/users/:userId/gender", async (req, res) => {
    try {
      const { userId } = req.params;
      const { gender } = req.body;
  
      const user = await User.findByIdAndUpdate(
        userId,
        { gender: gender },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({ message: "User gender updated Succesfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating user gender", error });
    }
  });