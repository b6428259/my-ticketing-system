// src/pages/TermsOfService.js
import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-white mb-6">Terms of Service</h1>
      <p className="text-lg text-center text-gray-700 mb-10">Welcome to our Terms of Service page. Here you will find the rules and regulations for using our services.</p>
      
      <div className="section">
        <h2 className="text-2xl font-semibold text-blue-500 mt-6">1. Acceptance of Terms</h2>
        <p className="text-gray-700 mb-4">By using our website, you agree to these terms and conditions. If you do not agree to these terms, please do not use our services.</p>
      </div>

      <div className="section">
        <h2 className="text-2xl font-semibold text-blue-500 mt-6">2. Definitions</h2>
        <p className="text-gray-700 mb-4">
          - <strong>Service</strong>: Refers to the ticket booking services provided on this website.<br />
          - <strong>User</strong>: Refers to anyone who accesses or uses our website.<br />
          - <strong>Event Organizer</strong>: Refers to individuals or organizations that wish to host events using our platform.
        </p>
      </div>

      <div className="section">
        <h2 className="text-2xl font-semibold text-blue-500 mt-6">3. User Registration</h2>
        <p className="text-gray-700 mb-4">To book tickets or host shows, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
      </div>

      <div className="section">
        <h2 className="text-2xl font-semibold text-blue-500 mt-6">4. Booking Tickets</h2>
        <p className="text-gray-700 mb-4">
          Users can book tickets for events hosted on our platform. All ticket sales are final, and no refunds or exchanges will be made unless the event is canceled. 
          In the event of a cancellation, users will be notified via email and will be eligible for a full refund.
        </p>
      </div>

      <div className="section">
        <h2 className="text-2xl font-semibold text-blue-500 mt-6">5. Hosting Shows</h2>
        <p className="text-gray-700 mb-4">
          If you wish to host a show, you must contact us for approval. We reserve the right to refuse any event or cancel any event that violates our policies.
          Event organizers are responsible for adhering to all relevant laws and regulations.
        </p>
      </div>

      <div className="section">
        <h2 className="text-2xl font-semibold text-blue-500 mt-6">6. Payment and Fees</h2>
        <p className="text-gray-700 mb-4">Users are responsible for paying all fees associated with their ticket purchases. We may charge additional fees for service and processing.</p>
      </div>

      <div className="section">
        <h2 className="text-2xl font-semibold text-blue-500 mt-6">7. User Conduct</h2>
        <p className="text-gray-700 mb-4">
          Users agree to use the service only for lawful purposes and in a manner that does not infringe the rights of others. Users must not post or transmit any harmful or disruptive content.
        </p>
      </div>

      <div className="section">
        <h2 className="text-2xl font-semibold text-blue-500 mt-6">8. Intellectual Property</h2>
        <p className="text-gray-700 mb-4">All content on this website, including text, graphics, logos, and software, is the property of the website owner and is protected by intellectual property laws.</p>
      </div>

      <div className="section">
        <h2 className="text-2xl font-semibold text-blue-500 mt-6">9. Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          The website owner shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of or inability to use our services.
        </p>
      </div>

      <div className="section">
        <h2 className="text-2xl font-semibold text-blue-500 mt-6">10. Changes to Terms</h2>
        <p className="text-gray-700 mb-4">We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of the service signifies your acceptance of the modified terms.</p>
      </div>

      <div className="section">
        <h2 className="text-2xl font-semibold text-blue-500 mt-6">11. Governing Law</h2>
        <p className="text-gray-700 mb-4">These terms shall be governed by and construed in accordance with the laws of [Your Country/State].</p>
      </div>

      <div className="section">
        <h2 className="text-2xl font-semibold text-blue-500 mt-6">12. Contact Us</h2>
        <p className="text-gray-700 mb-4">If you have any questions or concerns about these terms, please contact us at [Your Contact Email].</p>
      </div>

      <p className="text-center text-gray-600 mt-10">Last updated: September 29, 2024</p>
    </div>
    </div>
  );
};

export default TermsOfService;
