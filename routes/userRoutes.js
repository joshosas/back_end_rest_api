// routes/userRoutes.js:

import express from "express";
import { getAllUsers, signup, login } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/signup", signup);
router.post("/login", login);

export default router;
