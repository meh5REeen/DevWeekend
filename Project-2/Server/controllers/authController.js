import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/users.js";
import transporter from "../config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE,PASSWORD_RESET_TEMPLATE } from "../config/EmailTemplates.js";
export const register = async(req,res)=>{
    const {name,email,password} = req.body;
    if (!name || !email || !password){
        return res.json({success : false, message:"Missing Details"})
    }

    try{
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.json({success:false,message:"User Already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new userModel({name,email,password:hashedPassword})
        await user.save();

        const token = jwt.sign({id:user._id },process.env.JWTSECRET,{expiresIn:'7d'});
        res.cookie('token',token,{
            httpOnly : true,
            secure : process.env.NODE_ENV ==="production",
            sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge : 7 * 24 * 60 * 60 * 1000,

        });

        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to : email,
            subject : 'Welcome to Great Stack',
            text : `WElcome to stack,Your account has been create with the email id : ${email}`
        }

        try {
            await transporter.sendMail(mailOptions);
        } catch (emailErr) {
            console.error("Email sending failed:", emailErr.message);
        }        
        
        return res.json({success:true})
    }   
    catch(error){
        res.json({success:false,message:error.message})
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        return res.json({success:false , message:"Email and Password are required"})
    }

    try{
        const user = await userModel.findOne({email});
        //Check for the user credentials 
        if(!user){
            return res.json({success:false, message:"Invalid Email"})
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message : "Invalid Password!"})
        }

        //Generate or create a token
        const token = jwt.sign({id:user._id },process.env.JWTSECRET,{expiresIn:'7d'});
        res.cookie('token',token,{
            httpOnly : true,
            secure : process.env.NODE_ENV ==="production",
            sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge : 7 * 24 * 60 * 60 * 1000,

        });
        return res.json(({success:true}))
    }
    catch(error){
        return res.json({success:false , message : error.message})
    }
}
export const logout = async (req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly:true,
            secure : process.env.NODE_ENV ==="production",
            sameSite : process.env.NODE_ENV === "production" ? "none" : "strict"
        })
        return res.json({success:true,message:"Logged out"})
    }
    catch(error){
                return res.json({success:false , message : error.message})

    }
}

//Sends the OTP
export const sendVerifyOtp  = async (req,res) =>{
    try{
        const {userId} = req.body;

        const user =  await userModel.findById(userId);

        if(user.isAccountVerified){
            return res.json({success:false, message:"Account Already Verified!"})
        }
        
        //six digit random number
        const otp = String(Math.floor(100000 + Math.random() * 900000) );
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000 ;


        await user.save();
        console.log("otp "+user.verifyOtp);

        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to : user.email,
            subject : "Account verification Otp",
            // text : `You Otp is ${otp}. Verify your account using this OTP.`,
            html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)

        }

        await transporter.sendMail(mailOptions);
        res.json({success: true,message:"OTP sent via email"});
    }
    catch(error){
       return res.json({success:false,message:error.message})
    }
}
// verifies account using otp
export const verifyEmail = async ( req, res) => {
    const {userId,otp} = req.body;

    if(!userId || !otp){
        return res.json({success:false , message: "Missing details"});
    }

    try{
        const user = await userModel.findById(userId);
        
        if(!user){
            return res.json({success:false,message:"user not found"});
        }

        if(user.verifyOtp == "" || user.verifyOtp != otp ){
            console.log("otp "+user.verifyOtp);
            return res.json({success:false,message:"Invalid otp"})
        }

        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({success:false, message:"OTP expired"})
        }

        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;


        await user.save();
        return res.json({success:true,
            message:"Email verified successfully!"
        });
    }
    catch(error){
        return res.json({success:false,message:error.message});
    }
}
// check for authentication

export const isAuthenticated = async(req,res) =>{
    try{
        return res.json({success:true})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}

// send Password reset otp
export const sendResetOtp = async (req,res) => {
    const {email} = req.body;
    if(!email){
        return res.json({success:false,message : "email is required"});
    }

    try{
        const user =  await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User NOt found"});
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000) );
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000 ;


        await user.save();
        console.log("otp "+user.resetOtp);

        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to : user.email,
            subject : "Password Reset Otp",
            html:PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)

            // text : `Your Otp for resetting your password is ${otp}. Use this otp for resetting your password.`,
        };

        await transporter.sendMail(mailOptions);
        return res.json({success:true,message:"OTP sent to your email!"});
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}

// REset user pass
export const resetPassword = async(req,res) => {
    const {email,otp,newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({success:false , message : "Email , OTP and new Password required."})

    }

    try{

        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not find"});
        }

        if(user.resetOtp === ""  || user.resetOtp != otp){
            return res.json({success:false,message:"Invalid otp"})
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success:false , message:"OTP expired"})
        }

        const hashedpass = await bcrypt.hash(newPassword,10);
        user.password = hashedpass;
        user.resetOtp = "";
        user.resetOtpExpireAt= 0;

        await user.save();

        return res.json({success:true,message:"Password changed successfully"})
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}