import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingModal.css";

const timeSlots = {
  Morning: ["09:00 AM", "10:00 AM", "11:00 AM"],
  Afternoon: ["12:00 PM", "01:00 PM", "02:00 PM"],
  Evening: ["05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"],
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

function BookingModal({ restaurant, onClose }) {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(
    formatDate(new Date())
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 7);

  const dates = Array.from({ length: 8 }, (_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() + index);
    return date;
  });

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      setError("Please select a date and time.");
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const bookingDate = new Date(
      `${selectedDate}T12:00:00`
    );

    const booking = {
      id: Date.now(),
      restaurantName: restaurant.restaurantName,
      rating: restaurant.rating,
      address: restaurant.address,
      city: restaurant.city,
      state: restaurant.state,
      bookingDate: bookingDate.toISOString(),
      bookingTime: selectedTime,
      bookingEmail: email.trim(),
    };

    let existingBookings = [];

    try {
      const saved = JSON.parse(
        localStorage.getItem("bookings") || "[]"
      );

      existingBookings = Array.isArray(saved) ? saved : [];
    } catch {
      existingBookings = [];
    }

    localStorage.setItem(
      "bookings",
      JSON.stringify([...existingBookings, booking])
    );

    onClose();
    navigate("/my-bookings");
  };

  return (
    <div className="booking-overlay" onClick={onClose}>
      <div
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Book restaurant reservation"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close booking modal"
        >
          ✕
        </button>

        <h2>Book Your Table</h2>

        <h3>{restaurant.restaurantName}</h3>

        <p className="booking-address">
          {restaurant.address}
        </p>

        <p className="today-label">Today</p>

        <div className="booking-dates">
          {dates.map((date) => {
            const dateValue = formatDate(date);

            return (
              <button
                type="button"
                key={dateValue}
                className={
                  selectedDate === dateValue ? "active" : ""
                }
                onClick={() => {
                  setSelectedDate(dateValue);
                  setSelectedTime("");
                  setError("");
                }}
              >
                <span>
                  {date.toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </span>

                <strong>{date.getDate()}</strong>
              </button>
            );
          })}
        </div>

        <div className="booking-time-sections">
          {Object.entries(timeSlots).map(([period, slots]) => (
            <div className="time-section" key={period}>
              <p className="time-heading">{period}</p>

              <div className="time-slots">
                {slots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    className={
                      selectedTime === slot ? "active" : ""
                    }
                    onClick={() => {
                      setSelectedTime(slot);
                      setError("");
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <label className="booking-email-label" htmlFor="bookingEmail">
          Email Address
        </label>

        <input
          id="bookingEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        {error && <p className="booking-error">{error}</p>}

        <button
          type="button"
          className="confirm-booking"
          onClick={handleBooking}
        >
          Confirm Reservation
        </button>
      </div>
    </div>
  );
}

export default BookingModal;