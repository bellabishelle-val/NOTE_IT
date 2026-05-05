import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="modern-footer">
        <div className="container">
          <div className="row">
            {/* Column 1 - Sale Promotion */}
            <div className="col-lg-4 mb-4">
              <div className="footer-section">
                <h3 className="footer-title">
                  Back-to-School Sale
                </h3>
                <p className="footer-description">
                  Gear up for the new school year with our exciting back-to-school sale! 
                  Enjoy discounts on all notebooks and stationery items. Perfect for 
                  students and professionals alike.
                </p>
                <div className="text-center mt-4">
                  <button className="btn footer-btn">
                    Shop the Sale
                  </button>
                </div>
              </div>
            </div>

            {/* Column 2 - Contact Form */}
            <div className="col-lg-4 mb-4">
              <div className="footer-section">
                <h3 className="footer-title text-center">
                  Get in Touch
                </h3>
                <p className="footer-description">
                  We're here to assist you with any questions or concerns you may have. 
                  Reach out to us today!
                </p>
                <form className="footer-form">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control footer-input"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="form-control footer-input"
                  />
                  <textarea
                    className="form-control footer-input"
                    placeholder="Leave a Comment"
                    rows="3"
                  ></textarea>
                  <div className="text-center">
                    <button type="submit" className="btn footer-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Column 3 - Social Media */}
            <div className="col-lg-4 mb-4">
              <div className="footer-section">
                <h3 className="footer-title text-center">
                  Stay Connected
                </h3>
                <div className="social-links">
                  <a href="https://www.facebook.com" className="social-link">
                    <span className="social-icon social-text">f</span>
                  </a>
                  <a href="https://instagram.com" className="social-link">
                    <img src="images/in.png" alt="Instagram" className="social-icon" />
                  </a>
                  <a href="https://twitter.com" className="social-link">
                    <img src="images/x.png" alt="Twitter" className="social-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="footer-bottom">
          <div className="container text-center">
            <p className="copyright">
              Developed by VALERIE M. © 2026 All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;