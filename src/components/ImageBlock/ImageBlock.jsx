import React, { useState, useEffect, useRef } from 'react';
import { Tooltip, CircularProgress } from '@mui/material';
import { Info } from 'lucide-react';
import './ImageBlock.css'; // Custom CSS styles

const ImageBlock = ({ src, alt, tooltipTitle, tooltipDescription, style }) => {
  const [loading, setLoading] = useState(true);
  const [inView, setInView] = useState(false);
  const imageRef = useRef(null);

  // Callback when the image has loaded
  const handleImageLoad = () => {
    setLoading(false);
  };

  // Set up Intersection Observer to add animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the image is in view
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <Tooltip
      title={
        <div className="tooltip-content">
          <h3 className="tooltip-title">{tooltipTitle}</h3>
          <p className="tooltip-description">{tooltipDescription}</p>
          <Info className="tooltip-icon" />
        </div>
      }
      arrow
      placement="top"
      classes={{ tooltip: 'custom-tooltip' }}
    >
      <div className="image-block-container overflow-hidden rounded-lg relative" style={style}>
        {loading && (
          <div className="image-loader">
            <CircularProgress style={{ color: 'white' }} />
          </div>
        )}
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          loading="eager"
          onLoad={handleImageLoad}
          className={`image-block rounded-lg shadow-lg bg-black bg-opacity-80 border-2 border-white transition duration-300 transform ${
            loading ? 'invisible' : 'hover:scale-110'
          } ${inView ? 'animate-slide-up' : ''}`}
        />
      </div>
    </Tooltip>
  );
};

export default ImageBlock;
