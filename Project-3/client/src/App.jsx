import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignOut from "./pages/SignOut.jsx";
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path ="/" element = {<Home/>}/>
        <Route path ="/sign-up" element = {<SignUp/>}/>
        <Route path ="/sign-out" element = {<SignOut/>}/>
        <Route path ="/about" element = {<About/>}/>
        <Route path ="/profile" element = {<Profile/>}/>
    </Routes>
    </BrowserRouter>
  )
}
