// PrivacyPolicy.jsx

import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
  <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-900">
        <h1 className="text-4xl font-bold text-center text-white mb-6">Privacy Policy</h1>
        <p className="text-lg text-center text-gray-700 mb-10">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and share your personal information when you use our services.
        </p>
        
        <div className="section mb-6">
          <h2 className="text-2xl font-semibold text-blue-500 mt-4">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect information that you provide to us directly, such as when you purchase tickets or sign up for our newsletter. 
            We may also collect information automatically when you use our website, such as your IP address and browsing behavior.
          </p>
        </div>
        
        <div className="section mb-6">
          <h2 className="text-2xl font-semibold text-blue-500 mt-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect to provide our services, communicate with you, and improve our offerings. 
            We may also use your information for marketing purposes if you have given your consent.
          </p>
        </div>

        <div className="section mb-6">
          <h2 className="text-2xl font-semibold text-blue-500 mt-4">Sharing Your Information</h2>
          <p className="text-gray-700 mb-4">
            We do not share your personal information with third parties except as necessary to provide our services or as required by law. 
            We may share your information with service providers who assist us in our business operations.
          </p>
        </div>

        <div className="section mb-6">
          <h2 className="text-2xl font-semibold text-blue-500 mt-4">Your Rights</h2>
          <p className="text-gray-700 mb-4">
            You have the right to access, modify, or delete your personal information at any time. If you have any questions or concerns about your data, please contact us.
          </p>
        </div>

        <div className="section mb-6">
          <h2 className="text-2xl font-semibold text-blue-500 mt-4">Changes to This Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.
          </p>
        </div>

        <p className="text-gray-700 text-center">Last updated: September 29, 2024</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
