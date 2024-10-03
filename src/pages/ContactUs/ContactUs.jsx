// src/pages/ContactUs.js
import React from 'react';

const ContactUs = () => {
  return (
    <div className="contact-us max-w-7xl mx-auto px-4 py-8">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out to us!</p>
      <form className="contact-form">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input type="text" id="name" className="mt-1 p-2 w-full border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input type="email" id="email" className="mt-1 p-2 w-full border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <textarea id="message" className="mt-1 p-2 w-full border rounded" rows="4"></textarea>
        </div>
        <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
