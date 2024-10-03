import React, { useState, useEffect, useContext } from 'react'; // Added useContext
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Minus, ArrowLeft } from 'lucide-react';
import { Tooltip, IconButton, CircularProgress } from '@mui/material';
import Smoke from '../../components/Effects/Smoke/Smoke';
import backgroundImage from '../../assets/kamibbackground-notext-release.png';
import logoImage from '../../assets/kamiblogo.jpg';
import TicketTypeRow from './components/TicketTypeRow/TicketTypeRow';
import AboutSection from './components/AboutSection/AboutSection';
import aboutData from './data/AboutData';
import CharacterGrid from './components/CharacterGrid/CharacterGrid';
import { AuthContext } from '../../contexts/AuthContext'; // Import AuthContext
import LoginRequired from '../../components/Modals/LoginRequiredModal';
import VideoPreview from './components/VideoPreview/VideoPreview';
import videoSrc from '../../assets/Videos/kamibfun.mp4';
import posterImage from '../../assets/Images/kamibfunposter.jpg';
import { Button } from '@nextui-org/button';

const Kamibfun = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { concert } = location.state || { concert: { name: 'ขมิบฝัน - มหาวิทยาลับขอนแก่น' } };
  const [tickets, setTickets] = useState({
    adults: 0,
    child: 0,
    senior: 0,
  });
  const [loading, setLoading] = useState(false); // Loading state
  const { user } = useContext(AuthContext); // Get user from AuthContext

  const TICKET_PRICES = {
    adults: 18.49,
  };

  const MAX_TICKETS = 10; // Example maximum
  const handleIncrement = (type) => {
    if (tickets[type] < MAX_TICKETS) {
      setTickets((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    }
  };

  const handleDecrement = (type) => {
    if (tickets[type] > 0) {
      setTickets((prev) => ({ ...prev, [type]: prev[type] - 1 }));
    }
  };

  const handleContinue = async () => {
    setLoading(true); // Start loading
    await navigate('/reserve', { state: { tickets } });
    setLoading(false); // End loading
  };

  const calculateTotalPrice = () => {
    const { adults } = tickets;
    return (adults * TICKET_PRICES.adults).toFixed(2); // returns total as a string with two decimal places
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Smooth scroll function
  const smoothScrollTo = (target) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 1)', // Black background with 85% opacity
      }}
    >
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-20">
        <IconButton
          onClick={handleBack}
          sx={{ color: 'white' }}
          aria-label="Go Back"
        >
          <ArrowLeft />
        </IconButton>
      </div>

      <div
        className="text-white bg-cover bg-center min-h-screen relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="min-h-screen text-white relative bg-cover bg-center">
          {/* Video Preview Section */}
          <VideoPreview videoSrc={videoSrc} poster={posterImage} />
        </div>

        <Smoke />
        {/* About Section */}
        <AboutSection
          title={aboutData.title}
          description={aboutData.description}
        />
        {/* Character Grid Section */}
        <CharacterGrid />

        {/* Ticket Section */}
        <div id="ticket-section" className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold my-4 sm:mb-6 mb-20 text-center">Select Ticket Type</h1>
          <div className="max-w-sm sm:max-w-md mx-auto rounded-lg p-4 sm:p-6 shadow-lg bg-black bg-opacity-80">
            <div className="flex justify-center mb-4">
              <img src={logoImage} alt={concert.name} className="rounded-full w-24 h-24 sm:w-32 sm:h-32" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-center mb-2">{concert.name}</h2>

            {/* Ticket Types */}
            {Object.keys(TICKET_PRICES).map((type) => (
              <TicketTypeRow
                key={type}
                type={type}
                label={type.charAt(0).toUpperCase() + type.slice(1)} // Capitalizes the ticket type name
                price={TICKET_PRICES[type]}
                count={tickets[type]}
                onIncrement={() => handleIncrement(type)}
                onDecrement={() => handleDecrement(type)}
              />
            ))}

            <div className="flex justify-between items-center mt-4 sm:mt-6">
              <h3 className="text-lg sm:text-xl font-bold">Total: ${calculateTotalPrice()}</h3>
              {user ? ( // Check if user is logged in

<Button
  onClick={handleContinue}
  disabled={tickets.adults === 0}
  variant="contained"
  color="warning"
  style={{
    backgroundColor: loading ? '#8d8d8d' : (tickets.adults === 0 ? '#d3d3d3' : '#e19947'), // Light gray when disabled
    color: tickets.adults === 0 ? '#a9a9a9' : 'white', // Optional: change text color
    cursor: tickets.adults === 0 ? 'not-allowed' : 'pointer', // Change cursor style
    padding: '12px 24px', // Adjust padding for size
    fontSize: '18px', // Increase font size
    borderRadius: '8px', // Optional: adjust border radius for aesthetics
    width: '200px', // Optional: set a fixed width
  }}
>
  {loading ? 'Loading...' : 'Continue'}
</Button>


              ) : (
                <LoginRequired /> // Render LoginRequired component if user is not logged in
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kamibfun;
