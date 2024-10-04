//src\pages\Home\components\ConcertCard.jsx

import React from 'react';

const ConcertCard = ({ concert }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md w-auto max-w-56  transition-transform duration-300 hover:scale-105 cursor-pointer">
      {/* Flex container for image, name, and description */}
      <div className="flex flex-col items-center">
        {/* Picture section with fixed size and hover effect */}
        <img
          src={concert.concertPicUrl}
          alt={concert.concertName}
          className="w-40 h-40 rounded-md object-cover mb-2" // Added hover zoom and cursor pointer
        />
        
        {/* Name section */}
        <h3 className="text-lg font-semibold mt-2 text-center">{concert.concertName}</h3>
        
        {/* Date section */}
        <p className="text-sm text-gray-400">{new Date(concert.concertStartDate).toLocaleString()}</p>
        
        {/* Description section */}
        <p className="text-sm text-gray-400 text-center">{concert.concertDescription}</p>
      </div>
    </div>
  );
};

export default ConcertCard;
