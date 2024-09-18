import React from 'react';
import { Link } from 'react-router-dom';
import AudiotrackIcon from '@mui/icons-material/Audiotrack'; // Import the icon

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6 bg-gray-800">
      <div className="text-xl font-bold flex items-center">
        <AudiotrackIcon className="mr-2" /> {/* Add the icon */}
        <Link to="/" className="text-white">Mini Concerts</Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="text-white">Home</Link>
        <Link to="/about" className="text-white">About</Link>
        <Link to="/help" className="text-white">Help</Link>
      </div>
    </nav>
  );
};

export default Navbar;
