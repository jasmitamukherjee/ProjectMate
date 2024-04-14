// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const crypto = require("crypto");

// const nodemailer = require("nodemailer")
// const app = express();
// const port = 5000;
// const cors = require("cors");

// const http = require("http").createServer(app);
// const io = require("socket.io")(http);

// app.use(cors({
//   origin: '*'
// }));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// const jwt = require("jsonwebtoken");
// const User = require("./models/user");
// const Chat = require("./models/message");



// mongoose.connect("mongodb+srv://jasmitamukherjee4:jasmita@cluster0.xpvzw6u.mongodb.net/").then(()=>{
//     console.log("Connected to MongDb")
// }).catch((error)=>{
// console.log("Error connecting to MongoDb")
// })
// app.listen(port, () => {
//     console.log("Server is running on 5000");
//   });


//after dividing

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const cors = require("cors");

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(cors({
  origin: '*'
}));
const { secretKey } = require("./db");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Chat = require("./models/message");


// MongoDB connection
require("./db").connect();
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

       
        
    } catch (error) {
        console.log("Error registering user",error)
        res.status(500).json({message:"Registration failed"})
        
    }
})





// const generateSecretKey = ()=>{
//     const secretKey = crypto.randomBytes(32).toString("hex");

//   return secretKey;

// }
// const secretKey = generateSecretKey();




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

//endpoint to fetch all the profiles for a particular user
app.get("/profiles", async (req, res) => {
  const { userId, gender, keywords, lookingFor } = req.query;

  try {
    // let filter = { gender: gender === "male" ? "female" : "male" }; // For gender filtering
    let filter= {}
    // Add filtering based on turnOns and lookingFor arrays
    if (keywords) {
      filter.keywords = { $in: keywords };
    }

    if (lookingFor) {
      filter.lookingFor = { $in: lookingFor };
    }

    const currentUser = await User.findById(userId)
      .populate("matches", "_id")
      .populate("interested", "_id");

    // Extract IDs of friends
    const friendIds = currentUser.matches.map((friend) => friend._id);

    // Extract IDs of interested people
    const interestedIds = currentUser.interested.map((interested) => interested._id);

    const profiles = await User.find(filter)
      .where("_id")
      .nin([userId, ...friendIds, ...interestedIds]);

    return res.status(200).json({ profiles });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching profiles", error });
  }
});


//send like to mate 
// app.post("/send-like", async (req, res) => {
//   const { currentUserId, selectedUserId } = req.body;

//   try {
//     //update the recepient's friendRequestsArray!
//     await User.findByIdAndUpdate(selectedUserId, {
//       $push: { recievedLikes: currentUserId },
//     });
//     //update the sender's sentFriendRequests array
//     await User.findByIdAndUpdate(currentUserId, {
//       $push: { interested: selectedUserId },
//     });

//     res.sendStatus(200).json({message:"Like sent"});
//   } catch (error) {
//     res.sendStatus(500).json({message:"Error sendinga like"});
//   }
// });

//send like to mate 
app.post("/send-like", async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;

  try {
    //update the recepient's friendRequestsArray!
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { recievedLikes: currentUserId },
    });
    //update the sender's sentFriendRequests array
    await User.findByIdAndUpdate(currentUserId, {
      $push: { interested: selectedUserId },
    });

    res.status(200).json({ message: "Like sent" }); // Send only one response
  } catch (error) {
    res.status(500).json({ message: "Error sending a like" }); // Handle errors gracefully
  }
});

//ednpoint to get the details of the received Likes
app.get("/received-likes/:userId/details", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch details of users who liked the current user
    const receivedLikesDetails = [];
    for (const likedUserId of user.recievedLikes) {
      const likedUser = await User.findById(likedUserId);
      if (likedUser) {
        receivedLikesDetails.push(likedUser);
      }
    }

    res.status(200).json({ receivedLikesDetails });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching received likes details",
      error: error.message,
    });
  }
});

//endpoint to create a match betweeen two people
app.post("/create-match", async (req, res) => {
  try {
    const { currentUserId, selectedUserId } = req.body;

    //update the selected user's crushes array and the matches array
    await User.findByIdAndUpdate(selectedUserId, {
      // push: { matches: currentUserId },
      $addToSet: { matches: currentUserId }, // Use addToSet to avoid duplicate matches

      $pull: { interested: currentUserId },
    });

    //update the current user's matches array recievedlikes array
    await User.findByIdAndUpdate(currentUserId, {
      // push: { matches: selectedUserId },
      $addToSet: { matches: selectedUserId },

      $pull: { recievedLikes: selectedUserId },
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Error creating a match", error });
  }
});

//endpoint to get all the matches of the particular user
app.get("/users/:userId/matches", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchIds = user.matches;

    const matches = await User.find({ _id: { $in: matchIds } });

    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the matches", error });
  }
});

io.on("connection", (socket) => {
  console.log("a user is connected");

  socket.on("sendMessage", async (data) => {
    try {
      const { senderId, receiverId, message } = data;

      console.log("data", data);

      const newMessage = new Chat({ senderId, receiverId, message });
      await newMessage.save();

      //emit the message to the receiver
      io.to(receiverId).emit("receiveMessage", newMessage);
    } catch (error) {
      console.log("Error handling the messages");
    }
    socket.on("disconnet", () => {
      console.log("user disconnected");
    });
  });
});


http.listen(8000, () => {
  console.log("Socket.IO server running on port 8000");
});




//endpoint to get mesgs from backend 
app.get("/messages", async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    // console.log(senderId);
    // console.log(receiverId);

    const messages = await Chat.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).populate("senderId", "_id name");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error in getting messages", error });
  }
});

//endpoint to delete the messages;

app.post("/delete",async(req,res) => {
  try{
      const {messages} = req.body;
      console.log(req.body)

      if( !messages ||  messages.length == 0){
          return res.status(400).json({message:"Invalid request body"})
      };

      for(const messageId of messages){
          await Chat.findByIdAndDelete(messageId);
      }

      res.status(200).json({message:"Messages deleted successfully!"})
  } catch(error){
      res.status(500).json({message:"Internal server error",error})
  }
})