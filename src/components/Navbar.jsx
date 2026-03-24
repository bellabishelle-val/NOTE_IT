import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
function Navbar() {
  return (
    <section className="row bg-light">
      <div className="col-lg-12">
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundImage: "url(images/navbar.jpg)" }}
        >
          <Link to="/" className="navbar-brand">
            <img
              src="images/LOGO.jpg"
              alt="Logo"
              width="150"
              height="120"
              style={{ borderRadius: "90%" }}
            />
          </Link>

          <button
            className="navbar-toggler collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#navbarcontents"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id="navbarcontents" className="navbar-collapse collapse">
            <div className="navbar-nav" style={{ gap: "20px" }}>
              
              <Link
                to="/"
                className="nav-link"
                style={{  color: "maroon", fontSize: '30px'}}
              >
                ~HOME~
              </Link>

              <Link
                to="/signup"
                className="nav-link"
                style={{  color: "maroon", fontSize: '30px' }}
              >
                ~Sign Up~
              </Link>

              <Link
                to="/signin"
                className="nav-link"
                style={{  color: "maroon", fontSize: '30px' }}
              >
                ~Sign In~
              </Link>

              <Link
                to="/addproducts"
                className="nav-link"
                style={{  color: "maroon", fontSize: '30px' }}
              >
                ~Add Products~
              </Link>

              <Link
                to="/aboutus"
                className="nav-link"
                style={{  color: "maroon", fontSize: '30px' }}
              >
                ~ABOUT_US~
              </Link>

            </div>

            
          </div>
        </nav>
      </div>
    </section>
  );
}

export default Navbar;