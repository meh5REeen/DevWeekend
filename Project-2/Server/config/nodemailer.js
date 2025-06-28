import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
    host : "smtp.gmail.com",
    port : 587,
    secure : false,
    auth:{
        user : process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
    }
})
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "✓ Present" : "✗ Missing");

export default transporter;