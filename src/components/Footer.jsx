import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Restaurant</h3>
          <p>
            Discover great restaurants and make your reservations
            easily, anytime and anywhere.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">Find Restaurants</Link>
          <Link to="/my-bookings">My Bookings</Link>
          <Link to="/#locations">Locations</Link>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <Link to="/">Restaurants</Link>
          <span>Special Menus</span>
          <span>Photo Gallery</span>
          <span>Services</span>
        </div>

        <div className="footer-column">
          <h3>Information</h3>
          <span>About Us</span>
          <span>Contact Us</span>
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Restaurant Reservation.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;