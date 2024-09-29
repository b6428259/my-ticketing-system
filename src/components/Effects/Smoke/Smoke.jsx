import React, { useEffect, useRef } from 'react';
import './Smoke.css';

const Smoke = () => {
  const smokeRef = useRef(null);

  useEffect(() => {
    const smokeElement = smokeRef.current;
    const smokeCount = 8; // Increased number of smoke particles

    for (let i = 0; i < smokeCount; i++) {
      const smoke = document.createElement('div');
      smoke.className = 'smoke-particle';
      smoke.style.left = `${Math.random() * 100}%`;
      smoke.style.animationDelay = `${Math.random() * 3}s`; // Reduced maximum delay
      smokeElement.appendChild(smoke);
    }

    return () => {
      while (smokeElement.firstChild) {
        smokeElement.removeChild(smokeElement.firstChild);
      }
    };
  }, []);

  return <div ref={smokeRef} className="smoke-container" />;
};

export default Smoke;