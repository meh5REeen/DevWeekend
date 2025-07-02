import React from 'react';
import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';
export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="max-w-6xl  flex items-center justify-between px-4 py-3 w-full">
        {/* Logo on the left */}
        <Link to="/">
        <h1 className="font-bold text-xl flex flex-wrap">
          
          <span className="text-slate-500">Mehreen</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        </Link>

        {/* Search bar */}
        <form className=" flex items-center bg-slate-100 p-3 rounded-lg">
          <input
            className ='bg-transparent focus:outline-none w-24 sm:w-64'
            type="text"
            placeholder="Search..."
          />
          <FaSearch className= 'text-slate-600'/>
        </form>

        {/* Placeholder for right-side menu (optional) */}
        <nav>
          <ul className="flex gap-4 text-sm sm:text-base">
            <Link to="/"><li className="hidden sm:inline text-slate-700 hover:underline">Home</li></Link>
            <Link to="/about"><li className="hidden sm:inline text-slate-700 hover:underline">About</li></Link>
           <Link to = "/sign-up"><li className=" text-slate-700 hover:underline">Sign in</li></Link>

          </ul>
        </nav>
      </div>
    </header>
  );
}
