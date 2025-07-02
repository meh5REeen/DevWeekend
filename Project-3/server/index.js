import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js"


dotenv.config()
const app = express();

mongoose.connect(process.env.MONGO_STRING).then(
    () => {
        console.log("Connected to MONGO");
}).catch((err) => {
    console.log(err);
})


//Apis

app.use("/api/user",userRouter);



app.listen(process.env.PORT, ()=>{
    console.log("Server running on port 3000");
})