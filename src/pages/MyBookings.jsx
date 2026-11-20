import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./MyBookings.css";
import Footer from "../components/Footer";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    try {
      const savedBookings = JSON.parse(
        localStorage.getItem("bookings") || "[]"
      );

      setBookings(
        Array.isArray(savedBookings) ? savedBookings : []
      );
    } catch {
      setBookings([]);
    }
  }, []);

  const handleCancel = (id) => {
    const updatedBookings = bookings.filter(
      (booking) => booking.id !== id
    );

    setBookings(updatedBookings);

    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );
  };

  return (
    <>
      <Navbar />

      <main className="my-bookings-page">
        <div className="my-bookings-container">
          <h1>My Bookings</h1>

          {bookings.length === 0 ? (
            <div className="empty-bookings">
              <p>You haven't made any reservations yet.</p>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map((booking, index) => (
                <div
                  className="my-booking-card"
                  key={booking.id || index}
                >
                  <div>
                    <h3>{booking.restaurantName}</h3>

                    <p>📍 {booking.address}</p>

                    <p>
                      ⭐ {booking.rating}
                    </p>

                    <p>
                      📅{" "}
                      {new Date(
                        booking.bookingDate
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>

                    <p>🕒 {booking.bookingTime}</p>

                    <p>✉️ {booking.bookingEmail}</p>
                  </div>

                  <button
                    type="button"
                    className="cancel-booking"
                    onClick={() => handleCancel(booking.id)}
                  >
                    Cancel Booking
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MyBookings;