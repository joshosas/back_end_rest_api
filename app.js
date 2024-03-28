import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Your MongoDB connection string will be accessed through process.env
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

// Connect to MongoDB
mongoose
  .connect(MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(express.json());
app.use("api/users", userRoutes);
