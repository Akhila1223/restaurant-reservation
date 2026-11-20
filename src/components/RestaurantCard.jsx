import React from "react";
import "./RestaurantCard.css";

function RestaurantCard({ restaurant, onBook }) {
  const name =
    restaurant.restaurantName ||
    restaurant.name ||
    restaurant.Restaurant_Name ||
    "Unnamed Restaurant";

  const address =
    restaurant.address || restaurant.Address || "";

  const city = restaurant.city || restaurant.City || "";
  const state = restaurant.state || restaurant.State || "";

  const rating =
    restaurant.overall_rating ??
    restaurant.overallRating ??
    restaurant.rating ??
    restaurant.Overall_Rating ??
    "N/A";

  return (
    <div className="restaurant-card">
      <div className="restaurant-icon">🍽️</div>

      <div className="restaurant-info">
        <h3>{name}</h3>
        <p>{address}</p>
        <p>{city}, {state}</p>

        <span className="restaurant-rating">
          ⭐ {rating}
        </span>
      </div>

      <div className="restaurant-action">
        <p className="available-text">Available Today</p>

        <button
          type="button"
          onClick={() => onBook(restaurant)}
        >
          Book FREE Reservation
        </button>
      </div>
    </div>
  );
}

export default RestaurantCard;