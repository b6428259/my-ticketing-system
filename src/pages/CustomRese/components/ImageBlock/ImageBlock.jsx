// ImageBlock.js

import React from 'react';
import { Tooltip } from '@mui/material';
import { Info } from 'lucide-react'; // You can use any icon library you like
import './ImageBlock.css'; // Import a CSS file for custom styles

const ImageBlock = ({ src, alt, tooltipTitle, tooltipDescription, style }) => (
  <Tooltip
    title={
      <div className="tooltip-content">
        <h3 className="tooltip-title">{tooltipTitle}</h3>
        <p className="tooltip-description">{tooltipDescription}</p>
        <Info className="tooltip-icon" />
      </div>
    }
    arrow
    placement="top" // Change the placement as needed
    classes={{ tooltip: 'custom-tooltip' }} // Custom class for styling
  >
    <div className="overflow-hidden rounded-lg" style={style}>
      <img
        src={src}
        alt={alt}
        className="rounded-lg shadow-lg bg-black bg-opacity-80 border-2 border-white transition duration-300 transform hover:scale-110"
        style={{ width: '100%', height: 'auto', maxWidth: '250px', objectFit: 'cover' }}
      />
    </div>
  </Tooltip>
);

export default ImageBlock;
