import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'; // นำเข้า Navbar

// Import images
import marianneImage from '../assets/marianne.jpg';
import chadwickImage from '../assets/chadwick.png';
import theGorgeImage from '../assets/thegorge.jpg';
import blueRidgeMountainsImage from '../assets/BlueRidgeMountains.jpg';
import silverLakeImage from '../assets/silverlake.jpg';

export default function Home() {
  const navigate = useNavigate();

  const handleConcertClick = (concert) => {
    // นำทางไปที่หน้า Reserve พร้อมส่งข้อมูลคอนเสิร์ตไปด้วย
    navigate('/reserve', { state: { concert } });
  };

  const concerts = [
    { name: 'Marianne', imageUrl: marianneImage },
    { name: 'Chadwick', imageUrl: chadwickImage },
    { name: 'The Gorge', imageUrl: theGorgeImage },
    { name: 'Blue Ridge Mountains', imageUrl: blueRidgeMountainsImage },
    { name: 'Silver Lake', imageUrl: silverLakeImage },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar /> {/* ใช้ Navbar */}
      {/* Header Section */}
      <header className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Discover Mini Concerts</h1>
      </header>

      {/* Recommended Section */}
      <section className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Recommended for you</h2>
        <div className="overflow-x-auto flex space-x-12 scrollbar-hide">
          {concerts.map((concert, index) => (
            <div
              key={index}
              onClick={() => handleConcertClick(concert)}
              className="bg-cover bg-center h-60 w-60 flex-none rounded-lg shadow-md cursor-pointer"
              style={{ backgroundImage: `url(${concert.imageUrl})` }}
            >
              <div className="p-2 text-white font-bold">{concert.name}</div>
            </div>
          ))}
        </div>
      </section>
           {/* Favorite Artists Section */}
           <section className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Your favorite artists</h2>
        <div className="overflow-x-auto flex space-x-4 scrollbar-hide">
          {['Marianne', 'Chadwick', 'The Gorge', 'Blue Ridge Mountains', 'Silver Lake', 'New Artist 1', 'New Artist 2'].map(
            (artist, index) => (
              <div
                key={index}
                className="bg-cover bg-center h-40 w-40 flex-none rounded-lg shadow-md"
                style={{
                  backgroundImage: `url(https://via.placeholder.com/150?text=${artist})`,
                }}
              >
                <div className="p-2 text-white font-bold">{artist}</div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 p-8 text-center">
        <div className="flex justify-center space-x-8 text-sm mb-4">
          <a href="#about" className="hover:underline">About</a>
          <a href="#help" className="hover:underline">Help</a>
          <a href="#press" className="hover:underline">Press</a>
          <a href="#api" className="hover:underline">API</a>
          <a href="#jobs" className="hover:underline">Jobs</a>
          <a href="#privacy" className="hover:underline">Privacy</a>
          <a href="#terms" className="hover:underline">Terms</a>
        </div>
        <div className="text-gray-500 text-sm">&copy; 2023 Mini Concerts</div>
      </footer>
    </div>
  );
}
