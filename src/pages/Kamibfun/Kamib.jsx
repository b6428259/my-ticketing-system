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
import './Kamib.css'; // Load specific component styles after


const Kamibfun = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { concert } = location.state || { concert: { name: 'ขมิบฝัน - มหาวิทยาลับขอนแก่น' } };
  const [loading, setLoading] = useState(false); // Loading state
  const { user } = useContext(AuthContext); // Get user from AuthContext

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="kamib-container">
      <div
        className="min-h-screen flex flex-col justify-between"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 1)',
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
            <h1 className="text-xl sm:text-2xl font-bold my-4 sm:mb-6 mb-20 text-center">Book your ticket</h1>
            <div className="max-w-sm sm:max-w-md mx-auto rounded-lg p-4 sm:p-6 shadow-lg bg-black bg-opacity-80">
              <div className="flex justify-center mb-4">
                <img src={logoImage} alt={concert.name} className="rounded-full w-24 h-24 sm:w-32 sm:h-32" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-center mb-2">{concert.name}</h2>
              <div className="flex justify-center items-center mt-4 sm:mt-6">
                {user ? ( // Check if user is logged in
                  <Button
                    onClick={() => navigate(`/reserve/147`)}
                    variant="contained"
                    color="warning"
                    style={{
                      backgroundColor: loading ? '#8d8d8d' : '#e19947',
                      color: 'white',
                      cursor: 'pointer',
                      padding: '12px 24px',
                      fontSize: '18px',
                      borderRadius: '8px',
                      width: '200px',
                    }}
                  >
                    {loading ? 'Loading...' : 'จองเลย'}
                  </Button>
                ) : (
                  <LoginRequired /> // Render LoginRequired component if user is not logged in
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Kamibfun;
