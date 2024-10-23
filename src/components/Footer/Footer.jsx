import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // CSS for footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="footer-container">
          <div className="text-sm">
            <p>© 2024 SpotUp. All rights reserved.</p>
          </div>
          <div className="link-container">
<Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
<Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>
<Link to="/contact-us" className="hover:text-white">Contact Us</Link>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
