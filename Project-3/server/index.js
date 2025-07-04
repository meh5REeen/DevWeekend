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


app.listen(process.env.PORT, ()=>{
    console.log("Server running on port 3000");
})