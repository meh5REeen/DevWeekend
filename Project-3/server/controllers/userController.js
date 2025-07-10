import { createNextState } from "@reduxjs/toolkit";
import User from "../models/user.js";
export const test =(req,res) => {
    res.json({
        message:"Hi this is home"
    })
}

export const updateUser = async (req, res,next) => {
 
try{
  if (req.body.password){
    req.body.password = bcryptjs.hashSync(req.body.password,10);
  }

  const UpdatedUser = await User.findByIdAndUpdate(
    req.params.id,{
      $set:{
        username : req.body.username,
        email : request.body.email,
        password:req.body.password,
        avatar:req.body.avatar
      },
    },
    {new : true}
  );
  const {password,...rest} = UpdatedUser._doc;
  res.status(200).json(rest)
}
  catch (err) {
    console.error(err);
    next(err);
  }
};
