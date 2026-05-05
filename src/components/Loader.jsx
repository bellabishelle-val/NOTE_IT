import React from "react";
import "../css/Loader.css";

const Loader = () => {
  return (
    <div className="loading-container">
      <div className="modern-loader">
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
      </div>
      <p className="loading-text">Loading amazing products...</p>
    </div>
  );
};

export default Loader;