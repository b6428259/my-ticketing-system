import React from 'react';
import { Link } from 'react-router-dom';
import AudiotrackIcon from '@mui/icons-material/Audiotrack'; // Import the icon

const Navbar = ({ isVisible }) => {
  return (
    <nav className="flex justify-between items-center p-6 bg-black">
      <div className="text-xl font-bold flex items-center">
        <AudiotrackIcon className="mr-2" /> {/* Add the icon */}
        <Link to="/" className="text-white hover:text-gray-300 transition duration-200">
          SpotOn
        </Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="text-white hover:text-gray-300 transition duration-200">
          Home
        </Link>
        <Link to="/about" className="text-white hover:text-gray-300 transition duration-200">
          About
        </Link>
        <Link to="/help" className="text-white hover:text-gray-300 transition duration-200">
          Help
        </Link>
        <Link to="/login" className="text-white hover:text-gray-300 transition duration-200">
          Login
        </Link> {/* Add the login link */}
      </div>
    </nav>
  );
};

export default Navbar;
