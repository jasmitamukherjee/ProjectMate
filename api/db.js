const mongoose = require("mongoose");
const crypto = require("crypto");

// Generate secret key
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString("hex");
};

const secretKey = generateSecretKey();

const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://jasmitamukherjee4:jasmita@cluster0.xpvzw6u.mongodb.net/");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = { connect, secretKey };
