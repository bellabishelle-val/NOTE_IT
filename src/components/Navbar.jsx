import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import CartIcon from "./CartIcon";
import WishlistIcon from "./WishlistIcon";
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <section className="navbar-section">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light modern-navbar">
          <Link to="/" className="navbar-brand brand-logo">
            <div className="logo-container">
              <img
                src="images/LOGO.jpg"
                alt="Logo"
                className="logo-image"
              />
              <span className="brand-text">NOTE_IT</span>
            </div>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarcontents"
            aria-controls="navbarcontents"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id="navbarcontents" className="navbar-collapse collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link modern-nav-link">
                  <span className="nav-icon">🏠</span>
                  Home
                </Link>
              </li>
                            {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link modern-nav-link">
                      <span className="nav-icon">✨</span>
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signin" className="nav-link modern-nav-link">
                      <span className="nav-icon">🔐</span>
                      Sign In
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button 
                    className="nav-link modern-nav-link logout-btn"
                    onClick={logout}
                  >
                    <span className="nav-icon">🚪</span>
                    Logout
                  </button>
                </li>
              )}
              {isAuthenticated && (
                <li className="nav-item">
                  <Link to="/addproducts" className="nav-link modern-nav-link">
                    <span className="nav-icon">➕</span>
                    Add Products
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="/aboutus" className="nav-link modern-nav-link">
                  <span className="nav-icon">ℹ️</span>
                  About Us
                </Link>
              </li>
            </ul>
            
            {/* Cart and Wishlist Icons */}
            <div className="navbar-icons">
              <WishlistIcon />
              <CartIcon />
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}

export default Navbar;