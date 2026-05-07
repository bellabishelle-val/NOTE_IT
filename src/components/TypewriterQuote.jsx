import React, { useState, useEffect } from 'react';
import '../css/TypewriterQuote.css';

const TypewriterQuote = () => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [startBounce, setStartBounce] = useState(false);

  // The beautiful dedication quote
  const fullQuote = "Endowed with the Divine spark to reason and choose, our intelligence is not a tool for destructive ambition, but a sacred responsibility—an offering of mindfulness that stands as our highest form of gratitude.";
  const author = "~Valerie W.M 😌";

  useEffect(() => {
    let currentIndex = 0;
    let typingTimer;

    const typeWriter = () => {
      if (currentIndex < fullQuote.length) {
        setDisplayText(fullQuote.substring(0, currentIndex + 1));
        currentIndex++;
        typingTimer = setTimeout(typeWriter, 50); // Typing speed
      } else {
        setIsTyping(false);
        setStartBounce(true);
        // Start cursor blinking after typing is complete
        setTimeout(() => {
          setShowCursor(false);
        }, 3000);
      }
    };

    typeWriter();

    return () => {
      clearTimeout(typingTimer);
    };
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    if (!isTyping && showCursor) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(cursorInterval);
    }
  }, [isTyping, showCursor]);

  return (
    <div className="typewriter-quote-container">
      <div className="gem-wrapper">
        <div className={`gem-content ${startBounce ? 'bounce-animation' : ''}`}>
          <div className="quote-header">
            <div className="gem-icon">💎</div>
            <h3 className="gem-title">Daily Dedication</h3>
          </div>
          
          <div className="quote-text-container">
            <p className="quote-text">
              {displayText}
              {isTyping && <span className="typing-cursor">|</span>}
              {!isTyping && showCursor && <span className="blinking-cursor">|</span>}
            </p>
            
            {!isTyping && (
              <div className={`author-section ${startBounce ? 'slide-in' : ''}`}>
                <p className="author-text">{author}</p>
              </div>
            )}
          </div>
          
          <div className="gem-decoration">
            <div className="sparkle sparkle-1">✨</div>
            <div className="sparkle sparkle-2">⭐</div>
            <div className="sparkle sparkle-3">💫</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypewriterQuote;
