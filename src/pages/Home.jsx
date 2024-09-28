import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';

export default function Home() {
  const [concerts, setConcerts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/concert', {
          auth: {
            username: 'admin',
            password: 'admin12021234'
          },
          withCredentials: true // This is important for CORS with credentials
        });
        setConcerts(response.data);
      } catch (error) {
        console.error('Error fetching concerts:', error);
        setError('Failed to load concerts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  const handleConcertClick = (concert) => {
    navigate('/reserve', { state: { concert } });
  };

  const ConcertCard = ({ concert }) => (
    <div
      onClick={() => handleConcertClick(concert)}
      className="bg-cover bg-center h-60 w-60 flex-none rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105"
      style={{ backgroundImage: `url(${concert.imageUrl || '/api/placeholder/240/240'})` }}
    >
      <div className="p-2 text-white font-bold bg-gradient-to-t from-black via-transparent to-transparent">
        <div>{concert.concert_name}</div>
        <div>{new Date(concert.startdate).toLocaleDateString()}</div>
      </div>
    </div>
  );

  const ArtistCard = ({ artist }) => (
    <div
      className="bg-cover bg-center h-40 w-40 flex-none rounded-lg shadow-md"
      style={{ backgroundImage: `url(/api/placeholder/150/150?text=${encodeURIComponent(artist)})` }}
    >
      <div className="p-2 text-white font-bold bg-gradient-to-t from-black via-transparent to-transparent">
        {artist}
      </div>
    </div>
  );

  if (isLoading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <header className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Discover Mini Concerts</h1>
      </header>

      {error && (
        <div className="p-4 text-red-500 text-center">
          {error}
        </div>
      )}

      <section className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Recommended for you</h2>
        {concerts.length > 0 ? (
          <div className="overflow-x-auto flex space-x-4 scrollbar-hide">
            {concerts.map((concert) => (
              <ConcertCard key={concert.concert_id} concert={concert} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No concerts available.</div>
        )}
      </section>

      <section className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Your favorite artists</h2>
        <div className="overflow-x-auto flex space-x-4 scrollbar-hide">
          {['Marianne', 'Chadwick', 'The Gorge', 'Blue Ridge Mountains', 'Silver Lake', 'New Artist 1', 'New Artist 2'].map((artist, index) => (
            <ArtistCard key={index} artist={artist} />
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 p-8 text-center">
        <div className="flex justify-center space-x-8 text-sm mb-4">
          {['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:underline">{item}</a>
          ))}
        </div>
        <div className="text-gray-500 text-sm">&copy; 2023 Mini Concerts</div>
      </footer>
    </div>
  );
}