import React from 'react';
import './LoadingSpinner.css'; // Make sure to import your CSS file

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
