// Modal.js
import React from 'react';
import './Modal.css'; // Optional: Add your own styles

const Modal = ({ isOpen, onClose, character }) => {
  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{character.tooltipTitle}</h2>
        <img src={character.src} alt={character.alt} className="modal-image" />
        <p>{character.tooltipDescription}</p>
        <button className="modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
