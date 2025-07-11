import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Header from './Components/Header.jsx';
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path ="/" element = {<Home/>}/>
        <Route path ="/sign-up" element = {<SignUp/>}/>
        <Route path ="/sign-in" element = {<SignIn/>}/>
        <Route path ="/about" element = {<About/>}/>
        <Route path ="/profile" element = {<Profile/>}/>
    </Routes>
    </BrowserRouter>
  )
}
