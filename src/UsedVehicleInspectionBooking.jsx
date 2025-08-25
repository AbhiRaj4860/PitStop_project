import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "./App";
import ServiceDash from "./assets/ServiceDash.jpg"; 

function UsedVehicleInspectionBooking() {
  const { setBookingData } = useContext(BookingContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicleNumber: "",
    date: "",
    vehicleType: "Car", // Car or Bike
    serviceType: "onsite", // default On-Site
    location: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (form.serviceType === "home" && !form.location.trim()) {
      alert("Please enter the location for Home Service.");
      return;
    }

    setBookingData({
      ...form,
      mainService: "Used Vehicle Inspection"
    });

    navigate("/status");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Used Vehicle Inspection Booking</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>

          {/* Vehicle Type Dropdown */}
          <select
            name="vehicleType"
            value={form.vehicleType}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
          </select>

          {/* Name */}
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* Phone */}
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            style={styles.input}
            pattern="\d{10}"
          />

          {/* Vehicle Number */}
          <input
            name="vehicleNumber"
            placeholder="Vehicle Number"
            value={form.vehicleNumber}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            value={form.date}
            min={new Date().toISOString().split("T")[0]} // prevent past dates
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* Service Type Dropdown */}
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="onsite">On-Site Service</option>
            <option value="home">Home Service</option>
          </select>

          {/* Show Location only if Home Service */}
          {form.serviceType === "home" && (
            <input
              name="location"
              placeholder="Inspection Location"
              value={form.location}
              onChange={handleChange}
              required
              style={styles.input}
            />
          )}

          <button type="submit" style={styles.button}>
            Book Inspection
          </button>
        </form>
      </div>
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
    background: "rgba(0,0,0,0.6)",
    width: "100%",
    maxWidth: "420px",
    padding: "32px",
    borderRadius: "18px",
    boxShadow: "0 2px 18px rgba(0,0,0,0.17)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
  },
  heading: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: "1.6rem",
    marginBottom: "28px",
    color: "#fff",
    letterSpacing: "0.01em",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    marginBottom: "16px",
    border: "none",
    background: "#fff",
    color: "#333",
    fontSize: "15px",
    borderRadius: "8px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "13px 0",
    background: "#f7e305",
    color: "#000",
    fontWeight: "bold",
    fontSize: "16px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background 0.2s",
    marginTop: "12px",
  },
};

export default UsedVehicleInspectionBooking;
