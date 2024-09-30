import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

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

// Prop validation
AboutSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string).isRequired
  ]).isRequired,
};

export default AboutSection;
