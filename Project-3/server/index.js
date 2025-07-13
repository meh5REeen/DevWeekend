import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js"
import {authRouter} from "./routes/authRoute.js"
import cookieParser from "cookie-parser";
import cors from 'cors';

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
app.use(cookieParser())


app.use(cors({
  origin: 'http://localhost:5173',// Add your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


//Apis
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);

app.get("/tests",(req,res)=>{
    try{
    res.send("Hello");
    }
    catch(error){
        console.error("Error in there",error);
        res.status(500).send("Something went wrong!");
    }
})

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
    console.log("Server running on port",process.env.PORT);
})