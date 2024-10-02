import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import kamibfunImage from '../../assets/Images/kamibfunfeature.jpg'; // Import the image
import ConcertCard from './components/ConcertCard'; // Assuming you have this component

export default function Home() {
  const [concerts, setConcerts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

    // Function to get the JWT token from cookies
  function getTokenFromCookies() {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "token") {
        return value;
      }
    }
    return null;
  }

  useEffect(() => {
    const fetchConcerts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/v1/concert', {
          withCredentials: true, // Send the cookie
        });
        setConcerts(response.data.data);
      } catch (error) {
        console.error('Error fetching concerts:', error);
        if (error.response && error.response.status === 401) {
          setError("Session expired. Please log in again.");
          navigate('/login');
        } else {
          setError('Failed to load concerts. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    
  
    fetchConcerts();
  }, [navigate]);

  const handleFeaturedConcertClick = () => {
    navigate('/concerts/1'); // Redirect to the concert details page
  };
  

  const FeaturedConcertCard = () => {
    return (
      <div
        onClick={handleFeaturedConcertClick}
        className="cursor-pointer transition-transform transform hover:scale-105 mb-4 max-w-2xl mx-auto" // Add max width and center the card
      >
        <h3 className="text-xl">ขมิบฝัน - ละครเวทีคณะสถาปัตยกรรมศาสตร์ มหาวิทยาลัยขอนแก่น</h3>
        <p>{new Date().toLocaleDateString()}</p>
        <img
          src={kamibfunImage}
          alt="Featured Show: Kamibfun"
          className="w-full h-auto rounded-lg" // Responsive image with full width and auto height
        />
        <div className="p-4 text-white font-bold bg-gradient-to-t from-black via-transparent to-transparent">
          {/* Additional details can go here */}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Discover your entertainments</h1>
      </header>

      {isLoading ? (
        <div className="p-4 text-gray-500 text-center">Loading concerts...</div>
      ) : (
        <>
          {/* Featured Concert Section */}
          <section className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Featured Show</h2>
            <FeaturedConcertCard />
          </section>

          {/* Recommended Concerts Section */}
          <section className="p-8">
                    <h2 className="text-2xl font-semibold mb-4">Recommended for you</h2>
                    {concerts.length > 0 ? (
                        <div className="overflow-x-auto flex space-x-4 scrollbar-hide">
                            {concerts.map((concert) => (
                                <ConcertCard key={concert.concertId} concert={concert} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-red-600">{error || 'No concerts available.'}</div>
                    )}
                </section>

                <section className="p-8">
                    <h2 className="text-2xl font-semibold mb-4">Upcoming Shows</h2>
                    {concerts.length > 0 ? (
                        <div className="overflow-x-auto flex space-x-4 scrollbar-hide">
                            {concerts.map((concert) => (
                                <ConcertCard key={concert.concertId} concert={concert} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-red-600">{error || 'No upcoming shows.'}</div>
                    )}
                </section>
        </>
      )}
    </div>
  );
}
