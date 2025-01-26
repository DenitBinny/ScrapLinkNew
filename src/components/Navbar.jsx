import React from 'react';
import { logo } from '../assets';  // Correctly import logo

const Navbar = () => {
  return (
    <div className="absolute bottom-10 right-10 flex items-center p-6 bg-blue-500 rounded-lg shadow-lg">
      <img src={logo} alt="Scraplink Logo" className="w-36" /> {/* Use logo directly */}
    </div>
  );
};

export default Navbar;
