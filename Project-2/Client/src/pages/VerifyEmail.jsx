import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import {toast} from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
const EmailVerify = () => {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const inputRefs = React.useRef([]);
    const {backendUrl,IsLoggedin,userData,getUserData} = useContext(AppContext);
    const handleInput = (e,index) =>{
        if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
            inputRefs.current[index+1].focus()
        } 
    }
    
    const handleKeyDown = (e,index) =>{
        if(e.key === "Backspace" && e.target.value === "" && index > 0){
            inputRefs.current[index-1].focus()
        }
    }

    const handlePaste = (e)=>{
        const paste = e.clipboardData.getData('text');
        const pasteArray = paste.split("");
        pasteArray.forEach((char,index)=>{
            if(inputRefs.current[index]){
                inputRefs.current[index].value = char
            }
        } )
    }
    const onSubmitHandler = async (e) => {
        try{
            e.preventDefault();
            const otpArray = inputRefs.current.map( e => e.value)
            const otp = otpArray.join('')

            const {data} = await axios.post(backendUrl + "api/auth/verify-account" ,{otp})

            if(data.success){
                toast.success(data.message)
                await getUserData()
                navigate("/")
            }
            else{
                toast.error(data.message);
            }
        }catch(error){
            toast.error(error.message)
        }
    }
useEffect(() => {
  getUserData(); // ensures userData is available
}, []);

useEffect(() => {
      console.log("Redirect Check →", {
    IsLoggedin,
    userData,
    isVerified: userData?.isAccountVerified,
  });
  if (IsLoggedin && userData && userData.isAccountVerified) {
    navigate('/');
  }
}, [IsLoggedin, userData]);
    return (
        <div className="flex items-center justify-center min-h-screen px-6
        sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 text-white">
        <img onClick= {()=> navigate("/") } src={assets.logo} alt = "" className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"/>
            
            
            <form onSubmit={onSubmitHandler} className=" ">
                <h1 className="text-white text-2xl font-semibold text-center mb-4">Email Verify OTP </h1>
                <p className="text-center mb-6 text-indigo-300">Enter the 6-digit code sent to your email id.</p>
                <div onPaste={handlePaste} className = "flex justify-between mb-8 ">
                    {Array(6).fill(0).map((_,index)=>(
                        <input ref={e => inputRefs.current[index] = e}
                        onInput={(e) => handleInput(e,index)}
                        onKeyDown={(e)=>handleKeyDown(e,index)}
                        type = "text" maxLength="1" key={index} required
                        className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"/>
                    ))}
                </div>
            <button className = "w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">Verify Email</button>    
            </form>
        </div>
    )
}
export default EmailVerify;