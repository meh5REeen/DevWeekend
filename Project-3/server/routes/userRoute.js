import express from "express";
import {test,updateAvatar}  from "../controllers/userController.js";

const userRouter = express.Router();


userRouter.get("/",test)
userRouter.put('/:id/avatar', updateAvatar);


export default userRouter;