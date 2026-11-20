import React from "react";

import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import HeroCarousel from "../components/HeroCarousel";
import Footer from "../components/Footer";

import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Table Reservation</h1>
            <p>
              Find the best restaurants and reserve your table
              in just a few clicks.
            </p>
          </div>

          <SearchForm />
        </section>

        <HeroCarousel />

        <section className="home-intro">
          <h2>Find Your Perfect Restaurant</h2>
          <p>
            Discover restaurants across the USA and enjoy a
            convenient table booking experience.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;