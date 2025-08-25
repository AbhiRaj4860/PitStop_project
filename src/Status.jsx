import React, { useContext } from "react";
import { BookingContext } from "./App";
import { useNavigate } from "react-router-dom";
import StatusBg from "./assets/Status.jpg"; // Background image

function Status() {
  const { bookingData, setBookingData } = useContext(BookingContext) || {};
  const navigate = useNavigate();

  const containerStyle = {
    minHeight: "100vh",
    backgroundImage: `url(${StatusBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#000",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    paddingTop: "80px",
    color: "#fff"
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.9)",
    padding: "20px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "420px",
    margin: "15px auto",
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#000",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
  };

  const buttonStyle = {
    padding: "10px 20px",
    background: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    color: "#ff0101"
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    background: "red",
    color: "#fff"
  };

  // Cancel booking by index
  const handleCancel = (index) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setBookingData((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Safety check
  if (!bookingData || bookingData.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2>No booking details found</h2>
          <button style={buttonStyle} onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "#f51f14ff", textAlign: "center" }}>
        Booking Confirmed
      </h1>
      <p style={{ textAlign: "center", marginBottom: "10px", color: "#fff", fontWeight: "bold" }}>
        Thank you for choosing our site! We appreciate your trust.
      </p>
      <p style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}>
        Here are your booking details:
      </p>

      {bookingData.map((booking, index) => {
        const details = Object.entries(booking).filter(
          ([, value]) => value && value !== ""
        );
        return (
          <div key={index} style={cardStyle}>
            <h3 style={{ marginBottom: "10px", color: "#d60000" }}>
              {booking.mainService} - {booking.serviceName}
            </h3>
            {details.map(([key, value]) => (
              <p key={key}>
                <strong>{formatKey(key)}:</strong> {value}
              </p>
            ))}
            <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button style={buttonStyle} onClick={() => navigate("/")}>
                Back to Services
              </button>
              <button style={cancelButtonStyle} onClick={() => handleCancel(index)}>
                Cancel Booking
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ✅ Helper to format keys
function formatKey(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

export default Status;
