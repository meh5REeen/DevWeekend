import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";


export const signup = async (req,res) => {
    
    const {email,password,username} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});
    
    try{
    
        await newUser.save();
        res.status(201).json({message:"User created successfully!"});

    }catch(error){
        next(errorHandler(550,"error in signup"));
    }
    
};
