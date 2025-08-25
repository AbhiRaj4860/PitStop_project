import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "./App";
import ServiceDash from "./assets/ServiceDash.jpg";

function RoadsideAssistBooking() {
  const { setBookingData } = useContext(BookingContext);
  const navigate = useNavigate();

  const assistOptions = [
    "Towing",
    "Flat Tire",
    "Jump Start",
    "Fuel Delivery",
    "Lockout Services",
    "Accident Recovery",
    "On-spot Minor Repair",
  ];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    assistType: assistOptions[0],
  });

  const [fetchingLocation, setFetchingLocation] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleLocationFetch = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setForm((prev) => ({
          ...prev,
          location: `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`,
        }));
        setFetchingLocation(false);
      },
      (error) => {
        alert("Unable to retrieve location: " + error.message);
        setFetchingLocation(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!form.location.trim()) {
      alert("Location is required for roadside assistance.");
      return;
    }

    setBookingData((prev) => [
  ...prev,
  {
    ...form,
    mainService: "Roadside Assist",
    status: "In Queue",
  },
]);

    navigate("/status");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🚗 Roadside Assistance Booking</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {/* Assistance Type */}
          <label style={styles.label}>Type of Assistance</label>
          <select
            name="assistType"
            value={form.assistType}
            onChange={handleChange}
            required
            style={styles.input}
          >
            {assistOptions.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Name */}
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* Phone */}
          <label style={styles.label}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="10-digit phone number"
            value={form.phone}
            onChange={handleChange}
            required
            style={styles.input}
            pattern="^[0-9]{10}$"
            title="Please enter a valid 10-digit phone number"
          />

          {/* Location */}
          <label style={styles.label}>Current Location</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              name="location"
              placeholder="Enter or fetch location"
              value={form.location}
              onChange={handleChange}
              required
              style={{ ...styles.input, flex: 1 }}
            />
            <button
              type="button"
              onClick={handleLocationFetch}
              style={{
                ...styles.locationButton,
                animation: fetchingLocation ? "pulse 1s infinite" : "none",
              }}
            >
              📍
            </button>
          </div>

          <button type="submit" style={styles.button}>
            🚨 Request Assistance
          </button>
        </form>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          select, input, button {
            transition: all 0.3s ease;
          }
          input:focus, select:focus {
            box-shadow: 0 0 8px #ffd60a;
            transform: scale(1.02);
          }
          button:hover {
            background: #ffcd00;
            transform: translateY(-2px);
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundImage: `url(${ServiceDash})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.3)",
    width: "100%",
    maxWidth: "420px",
    padding: "32px",
    borderRadius: "18px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
  },
  heading: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: "1.8rem",
    marginBottom: "28px",
    color: "#ffd60a",
    letterSpacing: "0.5px",
    textShadow: "0 0 6px rgba(0,0,0,0.5)",
  },
  label: {
    color: "#fff",
    fontSize: "14px",
    marginBottom: "4px",
    display: "block",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    marginBottom: "16px",
    border: "none",
    background: "rgba(255,255,255,0.9)",
    color: "#000",
    fontSize: "15px",
    borderRadius: "8px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "13px 0",
    background: "#ffd60a",
    color: "#000",
    fontWeight: "bold",
    fontSize: "16px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.2s",
    marginTop: "12px",
  },
  locationButton: {
    background: "#ffd60a",
    border: "none",
    borderRadius: "8px",
    padding: "0 12px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
};

export default RoadsideAssistBooking;
