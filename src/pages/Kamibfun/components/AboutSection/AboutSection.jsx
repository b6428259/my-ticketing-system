import React from 'react';

const AboutSection = ({ title, description }) => {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 mt-8 bg-opacity-80 rounded-lg shadow-lg text-center">
      <h2 className="text-lg sm:text-3xl mb-4">{title}</h2>
      <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
        {Array.isArray(description)
          ? description.map((line, index) => (
              <p key={index} className="mb-2">{line}</p>
            ))
          : <p>{description}</p>}
      </div>
    </div>
  );
};

export default AboutSection;