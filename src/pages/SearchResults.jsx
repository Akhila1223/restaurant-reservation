import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";
import { getRestaurants } from "../services/api";
import BookingModal from "../components/BookingModal";
import Footer from "../components/Footer";

import "./SearchResults.css";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const state = searchParams.get("state") || "";
  const city = searchParams.get("city") || "";

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchRestaurants = async () => {
      setLoading(true);
      setError("");
      setRestaurants([]);

      try {
        const data = await getRestaurants(state, city);

        console.log("Restaurants API response:", data);

        const restaurantList = Array.isArray(data)
          ? data
          : data.restaurants || [];

        if (active) {
          setRestaurants(restaurantList);
        }
      } catch (err) {
        if (active) {
          setError("Unable to fetch restaurants. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    if (state && city) {
      fetchRestaurants();
    } else {
      setLoading(false);
      setError("Please select a state and city.");
    }

    return () => {
      active = false;
    };
  }, [state, city]);

  const handleBook = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <>
      <Navbar />

      <main className="results-page">
        <div className="results-container">
          {loading ? (
            <div className="results-status">
              <p>Loading restaurants...</p>
              <p>The server may take up to 60 seconds to respond.</p>
            </div>
          ) : error ? (
            <p className="results-error">{error}</p>
          ) : (
            <>
              <h1>
                {restaurants.length} restaurants available in {city}
              </h1>

              <p className="results-subtitle">
                Book tables with minimum wait-time and verified restaurant
                details.
              </p>

              <div className="results-layout">
                <div className="restaurant-list">
                  {restaurants.length > 0 ? (
                    restaurants.map((restaurant, index) => (
                      <RestaurantCard
                        key={restaurant.id || index}
                        restaurant={restaurant}
                        onBook={handleBook}
                      />
                    ))
                  ) : (
                    <p>No restaurants found in {city}.</p>
                  )}
                </div>

                <aside className="results-ad">
                  <div className="ad-placeholder">
                    <span>🍕</span>
                    <h2>SUPER DELICIOUS FOOD</h2>
                    <p>Find your next favourite restaurant!</p>
                  </div>
                </aside>
              </div>
            </>
          )}
        </div>
      </main>
      {selectedRestaurant && (
        <BookingModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
      <Footer />
    </>
  );
}

export default SearchResults;
