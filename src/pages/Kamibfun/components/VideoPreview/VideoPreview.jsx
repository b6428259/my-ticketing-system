import React, { useRef, useEffect, useState } from 'react';
import './VideoPreview.css'; // Ensure to create this CSS file for styling
import { Volume2, VolumeX } from 'lucide-react'; // Import icons for volume control

const VideoPreview = ({ videoSrc, poster }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); // State to manage muted status

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted; // Toggle mute
      setIsMuted(!isMuted); // Update the state
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
        muted={isMuted} // Mute the video based on state
        playsInline // Allow the video to play inline on mobile devices
        autoPlay // Autoplay the video
        style={{
          width: '100vw', // Full viewport width
          height: '100vh', // Full viewport height
          objectFit: 'cover', // Cover the entire screen while maintaining aspect ratio
        }}
      >
        Your browser does not support the video tag.
      </video>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="mute-button"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer',
        }}
        aria-label={isMuted ? "Unmute" : "Mute"} // Accessibility label
      >
        {isMuted ? <VolumeX /> : <Volume2 />}
      </button>

      {/* Scroll Text and Arrow */}
      <div className="scroll-indicator">
        <p className="scroll-text">เลื่อนเพื่อดูรายละเอียด</p>
        <div className="arrow-down">
          &#9660; {/* Down arrow character */}
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
