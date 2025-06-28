import React from "react";
import {Routes,Route} from "react-router-dom";
import EmailVerify from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ToastContainer} from 'react-toastify';
import  "react-toastify/dist/ReactToastify.css"
const App = () => {
  return (
    <div>
      <ToastContainer/>
        <Routes>
            <Route path ="/" element = {<Home/>}></Route>
            <Route path ="/login" element = {<Login/>}></Route>
            <Route path ="/verifyEmail" element = {<EmailVerify/>}></Route>
            <Route path ="/reset-password" element = {<ResetPassword/>}></Route>
        </Routes>
    </div>
  )
}
export default App;