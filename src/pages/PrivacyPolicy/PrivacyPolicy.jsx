// PrivacyPolicy.jsx

import React from 'react';
import Navbar from '../../components/Navbar/Navbar'; // Import Navbar if you want it at the top of the Privacy Policy page

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-300 mb-4">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and share your personal information when you use our services.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
        <p className="text-gray-300 mb-4">
          We collect information that you provide to us directly, such as when you purchase tickets or sign up for our newsletter. We may also collect information automatically when you use our website, such as your IP address and browsing behavior.
        </p>
        <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
        <p className="text-gray-300 mb-4">
          We use the information we collect to provide our services, communicate with you, and improve our offerings. We may also use your information for marketing purposes if you have given your consent.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Sharing Your Information</h2>
        <p className="text-gray-300 mb-4">
          We do not share your personal information with third parties except as necessary to provide our services or as required by law. We may share your information with service providers who assist us in our business operations.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
        <p className="text-gray-300 mb-4">
          You have the right to access, modify, or delete your personal information at any time. If you have any questions or concerns about your data, please contact us.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Changes to This Policy</h2>
        <p className="text-gray-300 mb-4">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.
        </p>
        <p className="text-gray-300">Last updated: September 29, 2024</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
