import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // CSS for footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center flex-wrap">
          <div className="text-sm">
            <p>© 2024 SpotOn. All rights reserved.</p>
          </div>
          <div className="link-container space-x-4">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <a href="#terms-of-service" className="hover:text-white">Terms of Service</a>
            <a href="#contact-us" className="hover:text-white">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
