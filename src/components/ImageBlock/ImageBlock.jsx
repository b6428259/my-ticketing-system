import React, { useState } from 'react';
import { Tooltip, CircularProgress } from '@mui/material';
import { Info } from 'lucide-react'; // You can use any icon library you like
import './ImageBlock.css'; // Import a CSS file for custom styles

const ImageBlock = ({ src, alt, tooltipTitle, tooltipDescription, style }) => {
  const [loading, setLoading] = useState(true);

  // Callback when the image has loaded
  const handleImageLoad = () => {
    setLoading(false);
  };

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
      <div className="overflow-hidden rounded-lg relative" style={style}>
        {loading && (
          <div className="image-loader">
            <CircularProgress style={{ color: 'white' }} /> {/* Material UI CircularProgress spinner */}
          </div>
        )}
<img
  src={src}
  alt={alt}
  loading="lazy"
  onLoad={handleImageLoad}
  className={`rounded-lg shadow-lg bg-black bg-opacity-80 border-2 border-white transition duration-300 transform ${
    loading ? 'invisible' : 'hover:scale-110'
  }`}
  style={{ width: '100%', height: 'auto', maxWidth: '250px', objectFit: 'cover' }}
/>

      </div>
    </Tooltip>
  );
};

export default ImageBlock;
