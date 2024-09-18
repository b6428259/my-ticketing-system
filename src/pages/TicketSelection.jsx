import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@mui/material';  // ใช้ Button จาก MUI
import Navbar from '../Navbar';

const TicketSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { concert } = location.state || { concert: { name: 'Unknown Concert' } };
  const [tickets, setTickets] = useState({
    adults: 0,
    child: 0,
    senior: 0,
    largeCombo: 0,
    smallCombo: 0,
  });

  const handleIncrement = (type) => {
    setTickets((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleDecrement = (type) => {
    if (tickets[type] > 0) {
      setTickets((prev) => ({ ...prev, [type]: prev[type] - 1 }));
    }
  };

  const handleContinue = () => {
    navigate('/reserve', { state: { tickets } });
  };

  const handleBack = () => {
    navigate(-1); // ย้อนกลับไปหน้าก่อนหน้า
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="bg-gray-900 text-white p-8">
        <Button variant="contained" color="primary" onClick={handleBack}>
          Back
        </Button>
        <h1 className="text-2xl font-bold mb-6 text-center">Select Ticket Type</h1>
        
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
          <div className="flex justify-center mb-4">
            <img src={concert.imageUrl} alt={concert.name} className="rounded-full" />
          </div>
          <h2 className="text-xl font-semibold text-center mb-2">{concert.name}</h2>
          <p className="text-sm text-gray-400 text-center mb-6">AMC Metreon 16 | Today, Dec 15, 2023 | 7:45PM | 2 hr 37 min</p>
          
          <div className="space-y-4">
            <TicketTypeRow label="Adults" price="$18.49" value={tickets.adults} onIncrement={() => handleIncrement('adults')} onDecrement={() => handleDecrement('adults')} />
            <TicketTypeRow label="Child" price="$15.49" value={tickets.child} onIncrement={() => handleIncrement('child')} onDecrement={() => handleDecrement('child')} />
            <TicketTypeRow label="Senior" price="$18.49" value={tickets.senior} onIncrement={() => handleIncrement('senior')} onDecrement={() => handleDecrement('senior')} />
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mt-6 hover:bg-blue-700 transition duration-300"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const TicketTypeRow = ({ label, price, value, onIncrement, onDecrement }) => (
  <div className="flex justify-between items-center">
    <div>
      <p className="font-semibold">{label}</p>
      <p className="text-sm text-gray-400">{price}</p>
    </div>
    <div className="flex items-center space-x-2">
      <button onClick={onDecrement} className="bg-gray-700 p-1 rounded-full"><Minus size={16} /></button>
      <span className="w-8 text-center">{value}</span>
      <button onClick={onIncrement} className="bg-gray-700 p-1 rounded-full"><Plus size={16} /></button>
    </div>
  </div>
);

export default TicketSelection;
