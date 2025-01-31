import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHandsHelping } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Importing icons for the hamburger menu

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to handle menu visibility

  // Toggle the sidebar menu
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Sidebar on larger screens */}
      <div className="hidden lg:flex w-64 h-screen bg-gray-800 text-white p-5 fixed flex-col justify-between">
        {/* Sidebar Heading */}
        <div className="mb-5">
          <h3 className="text-xl font-bold mb-6">FeedbackAnalysis</h3>
          <div className="space-y-4">
            <div className="hover:text-gray-300 cursor-pointer text-3xl text-[#00df9a]">
              <h3>Quick Menu</h3>
            </div>
            <div className="hover:text-gray-300 cursor-pointer">
              <Link to='/'>Dashboard</Link>
            </div>
            <div className="hover:text-gray-300 cursor-pointer">Explore</div>
            <div className="hover:text-gray-300 cursor-pointer">Settings</div>
          </div>
        </div>

        {/* Log Out Button */}
        <div className="mt-5">
          <Link to="/useradmin">
            <button className="w-full bg-black text-[#00df9a] py-2 px-4 text-center font-medium rounded-md hover:bg-red-400">
              Log Out
            </button>
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-auto flex items-center gap-2">
          <FaHandsHelping className="text-xl" />
          <p className="text-base">Help Center</p>
        </div>
      </div>

      {/* Sidebar for mobile (Hamburger menu) */}
      <div className={`lg:hidden fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-50 ${isOpen ? '' : 'hidden'}`} onClick={toggleMenu}>
        <div className="flex justify-end p-4">
          <HiX className="text-white text-3xl cursor-pointer" onClick={toggleMenu} />
        </div>
        <div className="flex flex-col items-center justify-center h-full text-white">
          <Link to="/" onClick={toggleMenu} className="text-lg py-2">Dashboard</Link>
          <Link to="#" onClick={toggleMenu} className="text-lg py-2">Explore</Link>
          <Link to="#" onClick={toggleMenu} className="text-lg py-2">Settings</Link>
          <Link to="/useradmin" onClick={toggleMenu} className="text-lg py-2">Log Out</Link>
          <div className="flex items-center gap-2 mt-4">
            <FaHandsHelping className="text-xl" />
            <p className="text-base">Help Center</p>
          </div>
        </div>
      </div>

      {/* Hamburger Button for mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <HiMenuAlt3 className="text-white text-3xl cursor-pointer" onClick={toggleMenu} />
      </div>
    </div>
  );
};

export default Sidebar;
