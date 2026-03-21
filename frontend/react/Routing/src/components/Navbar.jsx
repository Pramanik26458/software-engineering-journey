import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between items-center px-8 py-4 bg-black  text-white">
        {/* Logo */}
        <h2 className="text-xl font-bold ">Navbar</h2>

        {/* 🔥 Premium Search Bar */}
        <div className="search-glow w-64 h-11">
          <div className="flex items-center h-full px-3 gap-2 rounded-full bg-[#111113] shadow-inner">
            {/* Icon */}
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7.5" />
              <line x1="20" y1="20" x2="15.5" y2="15.5" />
            </svg>

            {/* Input */}
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-white text-sm flex-1 caret-white"
            />

            {/* Shortcut */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#222224] border border-white/10">
              <span className="text-[10px] text-gray-400">⌘</span>
              <span className="text-[10px] text-gray-400">K</span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-5 font-medium">
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/Product">Product</Link>
          <Link to="/AllProduct">AllinOne</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
