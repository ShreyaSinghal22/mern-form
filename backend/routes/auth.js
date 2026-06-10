import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/protect.js";

const router = express.Router();

//register route
router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;
    try {
        if(!email|| !password || !name) {
            return res.status(400).json({message: "Please enter all fields"});
        }
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: "User already exists"});
        }

        const user = await User.create({name, email, password});
        if (user) {
            res.status(201).json({
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        }
    } catch (err) {
        res.status(500).json({message: err.message || "server error"});
    }
});

//login route
router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    console.log("Incoming Payload:", req.body);
    try {
        if(!email || !password) {
            return res.status(400).json({message: "Please enter all fields"});
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({message: "Invalid credentials"});
        }
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (err) {
        res.status(500).json({message: "server error"});
    }
});

//form-filling route
router.put("/submit-form", protect,  async (req, res) => {
    try {
        // 1. Pull the form fields sent from your React state body
        const { fullName, currentStatus, age, message } = req.body;

        // 2. Locate the existing user and fill in the blank fields
        const completedUser = await User.findByIdAndUpdate(
            req.user.id, // Derived automatically from the decrypted JWT token header
            { 
                fullName, 
                currentStatus, 
                age, 
                message 
            },
            { 
                returnDocument: "after",           // Returns the modified document rather than the old one
                runValidators: true  // Forces Mongoose to validate types (e.g., checking if age is a number)
            }
        ).select("-password"); // Hide the hashed password from the response body for security

        if (!completedUser) {
            return res.status(404).json({ message: "User account not found." });
        }

        // 3. Respond with the populated profile data
        res.status(200).json({
            message: "Form submitted successfully!"
        });

    } catch (error) {
        console.error("Form submission error:", error);
        res.status(500).json({ message: "Server error processing your form data." });
    }
});

router.get("/profile", protect, async (req, res) => {
    res.status(200).json(req.user);
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

export default router;