import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js"
import {authRouter} from "./routes/authRoute.js"

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_STRING)
.then(() => {
console.log("Connected to MONGO");
})
.catch((err) => {
console.log(err);
});

app.use(express.json())


//Apis
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);

app.use((err,req,res, next) => {
    const statusCode =  err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    }
    )
});

app.listen(process.env.PORT, ()=>{
    console.log("Server running on port 3000");
})