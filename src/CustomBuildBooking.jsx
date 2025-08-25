import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "./App";
import ServiceDash from "./assets/ServiceDash.jpg";

function CustomBuildBooking() {
  const { setBookingData, setBookings } = useContext(BookingContext); // ✅ added setBookings
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    cityState: "",
    brand: "",
    model: "",
    year: "",
    variant: "",
    fuelType: "",
    transmission: "",
    vin: "",
    currentColor: "",
    modificationTypes: [],
    description: "",
    preferredStyle: "",
    date: "",
    serviceType: "onsite",
    location: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (e) => {
    const { value, checked } = e.target;
    setForm({
      ...form,
      modificationTypes: checked
        ? [...form.modificationTypes, value]
        : form.modificationTypes.filter((item) => item !== value)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    if (form.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (form.serviceType === "home" && !form.location.trim()) {
      alert("Please enter your location for Home service.");
      return;
    }

    // ✅ Save latest booking for Status page
    setBookingData({
      ...form,
      mainService: "Vehicle Modification"
    });

    // ✅ Also push to global bookings (Admin Dashboard)
    setBookings((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: form.name,
        selectedService: "Custom Build / Vehicle Modification",
        date: form.date,
        status: "In Queue",
        details: form
      }
    ]);

    navigate("/status");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Custom Build / Vehicle Modification Request</h2>
        <form onSubmit={handleSubmit} style={styles.formContainer}>
          {/* CUSTOMER CONTACT INFORMATION */}
          <h3 style={styles.sectionTitle}>Customer Contact Information</h3>
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required style={styles.input} />
          <input name="phone" placeholder="Phone Number (10 digits)" value={form.phone} onChange={handleChange} required pattern="\d{10}" style={styles.input} />
          <input type="email" name="email" placeholder="Email Address (optional)" value={form.email} onChange={handleChange} style={styles.input} />
          <input name="cityState" placeholder="City / State" value={form.cityState} onChange={handleChange} required style={styles.input} />

          {/* VEHICLE DETAILS */}
          <h3 style={styles.sectionTitle}>Vehicle Details</h3>
          <input name="brand" placeholder="Brand / Manufacturer (e.g., Toyota)" value={form.brand} onChange={handleChange} required style={styles.input} />
          <input name="model" placeholder="Model Name (e.g., Fortuner)" value={form.model} onChange={handleChange} required style={styles.input} />
          <input name="year" placeholder="Model Year (e.g., 2021)" value={form.year} onChange={handleChange} style={styles.input} />
          <input name="variant" placeholder="Variant / Trim (e.g., VX, Alpha)" value={form.variant} onChange={handleChange} style={styles.input} />
          <select name="fuelType" value={form.fuelType} onChange={handleChange} style={styles.input}>
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
            <option value="Electric">Electric</option>
          </select>
          <select name="transmission" value={form.transmission} onChange={handleChange} style={styles.input}>
            <option value="">Select Transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
          <input name="vin" placeholder="VIN / Chassis Number (optional)" value={form.vin} onChange={handleChange} style={styles.input} />
          <input name="currentColor" placeholder="Current Vehicle Color" value={form.currentColor} onChange={handleChange} style={styles.input} />

          {/* MODIFICATION REQUIREMENTS */}
          <h3 style={styles.sectionTitle}>Modification Requirements</h3>
          <label style={styles.checkboxLabel}>
            <input type="checkbox" value="Exterior Styling" checked={form.modificationTypes.includes("Exterior Styling")} onChange={handleMultiSelect} /> Exterior Styling (wraps, paint jobs, body kits)
          </label>
          <label style={styles.checkboxLabel}>
            <input type="checkbox" value="Interior Customization" checked={form.modificationTypes.includes("Interior Customization")} onChange={handleMultiSelect} /> Interior Customization (seats, dashboard, lighting)
          </label>
          <label style={styles.checkboxLabel}>
            <input type="checkbox" value="Performance Upgrades" checked={form.modificationTypes.includes("Performance Upgrades")} onChange={handleMultiSelect} /> Performance Upgrades (turbo, exhaust, suspension)
          </label>
          <label style={styles.checkboxLabel}>
            <input type="checkbox" value="Audio/Infotainment" checked={form.modificationTypes.includes("Audio/Infotainment")} onChange={handleMultiSelect} /> Audio/Infotainment Upgrades
          </label>
          <label style={styles.checkboxLabel}>
            <input type="checkbox" value="Lighting Upgrades" checked={form.modificationTypes.includes("Lighting Upgrades")} onChange={handleMultiSelect} /> Lighting Upgrades (LED, projector, underglow)
          </label>
          <label style={styles.checkboxLabel}>
            <input type="checkbox" value="Wheel/Tyre Upgrades" checked={form.modificationTypes.includes("Wheel/Tyre Upgrades")} onChange={handleMultiSelect} /> Wheel/Tyre Upgrades
          </label>
          <label style={styles.checkboxLabel}>
            <input type="checkbox" value="Others" checked={form.modificationTypes.includes("Others")} onChange={handleMultiSelect} /> Others
          </label>

          <textarea name="description" placeholder="Describe your vision, special requests, or other details" value={form.description} onChange={handleChange} style={styles.textarea} />
          <input name="preferredStyle" placeholder="Preferred Style / Theme (sporty, luxury, minimal, off-road)" value={form.preferredStyle} onChange={handleChange} style={styles.input} />

          {/* DATE */}
          <input
            type="date"
            name="date"
            value={form.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* SERVICE TYPE */}
          <select name="serviceType" value={form.serviceType} onChange={handleChange} style={styles.input}>
            <option value="onsite">On-Site Service</option>
            <option value="home">Home Service</option>
          </select>

          {/* LOCATION */}
          {form.serviceType === "home" && (
            <input name="location" placeholder="Service Location / Delivery Address" value={form.location} onChange={handleChange} required style={styles.input} />
          )}

          <button type="submit" style={styles.button}>Submit Modification Request</button>
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
    maxWidth: "550px",
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
  formContainer: {
    width: "100%",
    boxSizing: "border-box",
  },
  sectionTitle: {
    color: "#f7e305",
    fontSize: "1rem",
    fontWeight: 600,
    margin: "16px 0 8px",
  },
  input: {
    width: "100%",
    padding: "13px 14px",
    marginBottom: "12px",
    border: "none",
    background: "#fff",
    color: "black",
    fontSize: "15px",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: "80px",
    padding: "12px",
    marginBottom: "12px",
    border: "none",
    background: "#fff",
    fontSize: "15px",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
  },
  checkboxLabel: {
    display: "block",
    color: "#fff",
    marginBottom: "6px",
    fontSize: "14px"
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
    marginTop: "12px",
  },
};

export default CustomBuildBooking;
