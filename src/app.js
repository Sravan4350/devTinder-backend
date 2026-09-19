require('dotenv').config();
const connectDB = require('./config/database');
const express = require('express');
const app = express();
const User = require('./model/user');

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ message: "Error creating user", error: error.message });
    }
});

connectDB()
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(3000, () => {
            console.log("Server is running on port 3000")
        })
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error)
    })
