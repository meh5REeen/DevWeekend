import express from "express";
import { signup } from "../controllers/authController.js";

export const authRouter = express.Router();

authRouter.post("/signup",signup)