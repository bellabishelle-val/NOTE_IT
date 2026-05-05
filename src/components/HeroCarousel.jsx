import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/HeroCarousel.css';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      image: '/images/carousel1.jpg',
      title: 'Premium Stationery Collection',
      subtitle: 'Discover our curated selection of high-quality stationery essentials',
      buttonText: 'EXPLORE COLLECTION',
      buttonLink: '/collection'
    },
    {
      id: 2,
      image: '/images/carousel2.jpg',
      title: 'Creative Writing Tools',
      subtitle: 'Elevate your writing experience with our premium pens and journals',
      buttonText: 'EXPLORE COLLECTION',
      buttonLink: '/collection'
    },
    {
      id: 3,
      image: '/images/carousel3.jpg',
      title: 'Professional Office Supplies',
      subtitle: 'Everything you need for a productive and organized workspace',
      buttonText: 'LEARN MORE',
      buttonLink: '/aboutus'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="hero-carousel">
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="slide-image-container">
              <img
                src={slide.image}
                alt={slide.title}
                className="slide-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/1200x600?text=Stationery+Collection';
                }}
              />
              <div className="slide-overlay"></div>
            </div>
            <div className="slide-content">
              <div className="slide-text">
                <h2 className="slide-title fade-in">{slide.title}</h2>
                <p className="slide-subtitle slide-in-left">{slide.subtitle}</p>
                <div className="slide-buttons slide-in-right">
                  <Link to={slide.buttonLink} className="btn btn-primary carousel-btn pulse">
                    {slide.buttonText}
                  </Link>
                  <Link to="/aboutus" className="btn btn-outline-light carousel-btn">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <button className="carousel-control prev" onClick={prevSlide}>
        <span className="carousel-arrow">‹</span>
      </button>
      <button className="carousel-control next" onClick={nextSlide}>
        <span className="carousel-arrow">›</span>
      </button>

      {/* Carousel Indicators */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll">
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
          <span>Scroll to explore more</span>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
