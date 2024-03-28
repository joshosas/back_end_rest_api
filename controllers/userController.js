// controllers/userController.js:

import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Signup
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if user with same email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists" });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
