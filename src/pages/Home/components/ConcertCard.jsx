import React from 'react';

const ConcertCard = ({ concert }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <img src={concert.concertPicUrl} alt={concert.concertName} className="w-full h-auto rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{concert.concertName}</h3>
      <p>{new Date(concert.concertStartDate).toLocaleString()}</p>
      <p className="text-sm text-gray-400">{concert.concertDescription}</p>
    </div>
  );
};

export default ConcertCard;
