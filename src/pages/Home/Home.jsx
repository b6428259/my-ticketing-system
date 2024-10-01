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

  useEffect(() => {
    const fetchConcerts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/v1/concert');
        setConcerts(response.data.data); // Accessing the `data` array from the API response
      } catch (error) {
        console.error('Error fetching concerts:', error);
        setError('Failed to load concerts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  const handleFeaturedConcertClick = () => {
    navigate('/kamibfun'); // Navigate to Kamibfun page
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
              <div className="text-center text-red-600">{error}</div>
            )}
          </section>

          {/* Upcoming Show Section */}
          <section className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Shows</h2>
            {concerts.length > 0 ? (
              <div className="overflow-x-auto flex space-x-4 scrollbar-hide">
                {concerts.map((concert) => (
                  <ConcertCard key={concert.concertId} concert={concert} />
                ))}
              </div>
            ) : (
              <div className="text-center text-red-600">{error}</div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
