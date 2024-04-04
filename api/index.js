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

  //endpoint to update description
  app.put("/users/:userId/description", async (req, res) => {
    try {
      const { userId } = req.params;
      const { description } = req.body;
  
      const user = await User.findByIdAndUpdate(
        userId,
        {
          description: description,
        },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res
        .status(200)
        .json({ message: "User description updated succesfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating user description" });
    }
  });

 //fetch users data
app.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching the user details" });
  }
}); 

//end point to add keyword for a user in the backend
app.put("/users/:userId/keywords/add", async (req, res) => {
  try {
    const { userId } = req.params;
    const { keywords } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { keywords: keywords } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Keywords updated succesfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error adding the keywords" });
  }
});

//endpoint to remove a particular keyword for the user
app.put("/users/:userId/keywords/remove", async (req, res) => {
  try {
    const { userId } = req.params;

    const { keywords } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { keywords: keywords } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Keywords removed succesfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Error removing keyword" });
  }
});

//end point to add a lookingFor  for a user in the backend
app.put("/users/:userId/looking-for", async (req, res) => {
  try {
    const { userId } = req.params;
    const { lookingFor } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { lookingFor: lookingFor },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user" });
    }

    return res
      .status(200)
      .json({ message: "Looking for updated succesfully".user });
  } catch (error) {
    res.status(500).json({ message: "Error updating looking for", error });
  }
});

//endpoint to remove looking for in the backend
app.put("/users/:userId/looking-for/remove", async (req, res) => {
  try {
    const { userId } = req.params;
    const { lookingFor } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { lookingFor: lookingFor },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user" });
    }

    return res
      .status(200)
      .json({ message: "Looking for updated succesfully".user });
  } catch (error) {
    res.status(500).json({ message: "Error removing looking for", error });
  }
});

//endpoint for project images 
app.post("/users/:userId/project-images", async (req, res) => {
  try {
    const { userId } = req.params;
    const { imageUrl } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.projectImages.push(imageUrl);

    await user.save();

    return res.status(200).json({ message: "Image has been added", user });
  } catch (error) {
    res.status(500).json({ message: "Error addding the profile images" });
  }
});