import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "./App";
import ServiceDash from "./assets/ServiceDash.jpg";

function SparePartsBooking() {
  const { setBookingData } = useContext(BookingContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    // Customer Information
    name: "",
    phone: "",
    email: "",

    // Vehicle Details
    brand: "",
    model: "",
    year: "",
    variant: "",
    fuelType: "",
    transmission: "",
    engineSize: "",
    vin: "",

    // Part Information
    partName: "",
    partNumber: "",
    quantity: 1,

    // Service Info
    date: "",
    serviceType: "onsite",
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

    // Validation
    if (!/^\d{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    if (form.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (form.serviceType === "home" && !form.location.trim()) {
      alert("Please enter your location for Home delivery.");
      return;
    }

    setBookingData((prev) => [
  ...prev,
  {
    ...form,
    mainService: "Spare parts",
    status: "In Queue",
  },
]);

    navigate("/status");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Spare Parts Booking</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>

          {/* 1️⃣ CUSTOMER CONTACT INFORMATION */}
          <h3 style={styles.sectionTitle}>Customer Contact Information</h3>

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            pattern="\d{10}"
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          {/* 2️⃣ VEHICLE DETAILS */}
          <h3 style={styles.sectionTitle}>Vehicle Details</h3>

          <input
            name="brand"
            placeholder="Manufacturer / Brand"
            value={form.brand}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="model"
            placeholder="Model Name"
            value={form.model}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="year"
            placeholder="Model Year"
            value={form.year}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            name="variant"
            placeholder="Variant / Trim"
            value={form.variant}
            onChange={handleChange}
            style={styles.input}
          />
          <select
            name="fuelType"
            value={form.fuelType}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
            <option value="Electric">Electric</option>
          </select>
          <select
            name="transmission"
            value={form.transmission}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select Transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
          <input
            name="engineSize"
            placeholder="Engine Size / Code"
            value={form.engineSize}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            name="vin"
            placeholder="VIN / Chassis Number (optional)"
            value={form.vin}
            onChange={handleChange}
            style={styles.input}
          />

          {/* 3️⃣ PART INFORMATION */}
          <h3 style={styles.sectionTitle}>Part Information</h3>

          <input
            name="partName"
            placeholder="Part Name (e.g., Brake Pad)"
            value={form.partName}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="partNumber"
            placeholder="Part Number (if known)"
            value={form.partNumber}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            min="1"
            style={styles.input}
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            value={form.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* Service Type */}
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="onsite">On-Site Pickup</option>
            <option value="home">Home Delivery</option>
          </select>

          {/* Location */}
          {form.serviceType === "home" && (
            <input
              name="location"
              placeholder="Delivery Location"
              value={form.location}
              onChange={handleChange}
              required
              style={styles.input}
            />
          )}

          <button type="submit" style={styles.button}>
            Order Spare Part
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
    maxWidth: "500px",
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
    marginBottom: "20px",
    color: "#fff",
    letterSpacing: "0.01em",
  },
  sectionTitle: {
    color: "#f7e305",
    fontSize: "1rem",
    fontWeight: 600,
    margin: "16px 0 8px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    marginBottom: "12px",
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

export default SparePartsBooking;
