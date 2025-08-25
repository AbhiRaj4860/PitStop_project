import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookingContext } from "./App";

function ServiceDetails() {
  const { serviceName } = useParams();
  const { setBookingData } = useContext(BookingContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicleNumber: "",
    date: "",
    time: "",
    serviceType: "home",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setBookingData({ ...form, serviceName });
    navigate("/status");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book Service: {serviceName}</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={inputStyle} />
        <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required style={inputStyle} />
        <input name="vehicleNumber" placeholder="Vehicle Number" value={form.vehicleNumber} onChange={handleChange} required style={inputStyle} />
        <input type="date" name="date" value={form.date} onChange={handleChange} required style={inputStyle} />
        <input type="time" name="time" value={form.time} onChange={handleChange} required style={inputStyle} />
        <select name="serviceType" value={form.serviceType} onChange={handleChange} style={inputStyle}>
          <option value="home">Home Service</option>
          <option value="onsite">On-Site Service</option>
        </select>
        <button type="submit" style={{ padding: "10px", width: "100%" }}>Submit</button>
      </form>
    </div>
  );
}

const inputStyle = { display: "block", marginBottom: "10px", width: "100%" };

export default ServiceDetails;
