import React from "react";
import "../css/Loader.css";

const Loader = () => {
  return (
    <div className="loading-container">
      <div className="cool-loader">
        <div className="stationery-loader">
          <div className="pen-loader">
            <div className="pen-body"></div>
            <div className="pen-tip"></div>
            <div className="pen-clip"></div>
          </div>
          <div className="notebook-loader">
            <div className="notebook-cover"></div>
            <div className="notebook-pages">
              <div className="page"></div>
              <div className="page"></div>
              <div className="page"></div>
            </div>
          </div>
          <div className="dots-loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>
      <p className="loading-text">Discovering amazing stationery...</p>
      <p className="loading-subtitle">Please wait while we curate your collection</p>
    </div>
  );
};

export default Loader;