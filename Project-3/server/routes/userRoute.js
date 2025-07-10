import express from "express";
import {test, updateUser}  from "../controllers/userController.js";
import { verifyToken } from "../utils/VerifyUser.js";
const userRouter = express.Router();


userRouter.get("/",test)
userRouter.put('/:id/update',verifyToken, updateUser);


export default userRouter;