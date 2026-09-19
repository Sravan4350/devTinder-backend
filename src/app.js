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

// GET user by email

app.get("/user", async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
});

// GET all users

app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
})

// UPDATE user by id

app.patch("/user", async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.body._id }, req.body);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   

        res.status(200).json({ message: "User updated successfully", user });
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
})


// DELETE user by id

app.delete("/user/", async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.body._id });  
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
})


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
