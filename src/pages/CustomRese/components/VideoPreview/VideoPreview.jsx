// VideoPreview.js
import React, { useRef, useEffect } from 'react';
import './VideoPreview.css'; // Ensure to create this CSS file for styling

const VideoPreview = ({ videoSrc, poster }) => {
  const videoRef = useRef(null);

  // Play the video when the component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error playing video:", error);
      });
    }
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset the video to the beginning
    }
  };

  return (
    <div
      className="video-preview"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', overflow: 'hidden' }} // Added styles
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        className="rounded-lg shadow-lg"
        muted // Mute the video to avoid sound
        playsInline // Allow the video to play inline on mobile devices
        autoPlay // Autoplay the video
        loop // Optional: loop the video
        style={{
          width: '100vw', // Full viewport width
          height: '100vh', // Full viewport height
          objectFit: 'cover', // Cover the entire screen while maintaining aspect ratio
        }}
      >
        Your browser does not support the video tag.
      </video>

      {/* Scroll Text and Arrow */}
      <div className="scroll-indicator">
        <p className="scroll-text">Scroll for more</p>
        <div className="arrow-down">
          &#9660; {/* Down arrow character */}
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
