// Loading.jsx
import React from 'react';

const Loading = () => {
  return (
    <div className="loading-screen">
      <h2 className='Text'>Loading...</h2>
      {/* You can customize this with a spinner or any other animation */}
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
