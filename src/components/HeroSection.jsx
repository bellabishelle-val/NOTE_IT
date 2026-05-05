import React from 'react';
import { Link } from 'react-router-dom';
import '../css/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title fade-in">
              Transform Your Ideas Into Reality
            </h1>
            <p className="hero-subtitle slide-in-left">
              Premium stationery essentials for the modern creator
            </p>
            <div className="hero-buttons slide-in-right">
              <Link to="/collection" className="btn btn-primary hero-btn pulse">
                Explore Collection
              </Link>
              <Link to="/aboutus" className="btn btn-outline-light hero-btn">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-image floating">
            <div className="image-placeholder">
              <div className="stationery-icons">
                <div className="icon-item">📝</div>
                <div className="icon-item">✏️</div>
                <div className="icon-item">📚</div>
                <div className="icon-item">🖊️</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
