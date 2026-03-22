import React from "react";
import "../css/Button.css";

// We changed { children } to { text } here
const Button = ({ text, type = "button", onClick }) => {
  return (
    <button type={type} className="custom-button" onClick={onClick}>
      <span className="button-text">{text}</span>
      
      <div className="star star-1"></div>
      <div className="star star-2"></div>
      <div className="star star-3"></div>
      <div className="star star-4"></div>
      <div className="star star-5"></div>
      <div className="star star-6"></div>
    </button>
  );
};

export default Button;