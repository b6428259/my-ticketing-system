import React, { useState, useEffect, useRef } from 'react';
import { Tooltip, CircularProgress } from '@mui/material';
import { Info } from 'lucide-react';
import './ImageBlock.css'; // Import a CSS file for custom styles

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
      <div
        className={`overflow-hidden rounded-lg relative image-block-container ${
          inView ? 'image-slide-up-container' : ''
        }`}
        style={style}
        ref={imageRef}
      >
        {loading && (
          <div className="image-loader">
            <CircularProgress style={{ color: 'white' }} />
          </div>
        )}
        <div className="image-zoom-wrapper">
          <img
            src={src}
            alt={alt}
            loading="eager"
            onLoad={handleImageLoad}
            className={`rounded-lg shadow-lg bg-black bg-opacity-80 border-2 border-white image-zoom ${
              loading ? 'invisible' : ''
            }`}
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '250px',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </Tooltip>
  );
};

export default ImageBlock;
