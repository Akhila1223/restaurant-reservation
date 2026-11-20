import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <div className="top-banner">
        Stay updated with the latest restaurants and maximize
        your dining experience with our platform.
      </div>

      <nav className="navbar">
        <Link to="/" className="logo">
          🍽️
          <span>Restaurant</span>
        </Link>

        <div className="nav-links">
          <NavLink to="/">Find Restaurants</NavLink>
          <a href="/#locations">Locations</a>
          <NavLink to="/my-bookings">Reservations</NavLink>
          <a href="/#special-menus">Special Menus</a>
          <a href="/#software">Restaurant Management Software</a>
          <a href="/#services">Services</a>
          <NavLink to="/my-bookings" className="booking-link">
            My Bookings
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Navbar;