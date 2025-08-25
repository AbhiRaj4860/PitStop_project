import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "./App";

import Swift from "./assets/cars/swift.jpg";
import Baleno from "./assets/cars/baleno.jpg";
import Dzire from "./assets/cars/Dzire.jpg";
import I20 from "./assets/cars/i20.jpg";
import Creta from "./assets/cars/Creta.jpg";
import Verna from "./assets/cars/Verna.jpg";
import Nexon from "./assets/cars/nexon.jpg";
import Harrier from "./assets/cars/Harrier.jpg";
import Tiago from "./assets/cars/Tiago.jpg";
import HondaCity from "./assets/cars/HondaCity.jpg";
import HondaJazz from "./assets/cars/HondaJazz.jpg";
import HondaAmaze from "./assets/cars/HondaAmaze.jpg";
import Innova from "./assets/cars/Innova.jpg";
import Fortuner from "./assets/cars/Fortuner.jpg";
import Glanza from "./assets/cars/Glanza.jpg";

export default function UsedCars() {
  const navigate = useNavigate();
  const { setBookingData } = useContext(BookingContext);

  // ✅ Full data restored
  const usedCars = [
    { name: "Maruti Suzuki Swift", price: "₹6.5 Lakh", kmDriven: 45800, transmission: "Manual", owners: 1, registrationRTO: "KA", year: 2019, fuel: "Petrol", image: Swift, condition: "Scratchless", variant: "Top End" },
    { name: "Maruti Suzuki Baleno", price: "₹7.2 Lakh", kmDriven: 63200, transmission: "Automatic", owners: 2, registrationRTO: "MH", year: 2020, fuel: "Petrol", image: Baleno, condition: "Minor scratches", variant: "Mid Variant" },
    { name: "Maruti Suzuki Dzire", price: "₹6.0 Lakh", kmDriven: 29500, transmission: "Manual", owners: 1, registrationRTO: "KA", year: 2018, fuel: "Diesel", image: Dzire, condition: "Scratchless", variant: "Base Model" },
    { name: "Hyundai i20", price: "₹6.8 Lakh", kmDriven: 51200, transmission: "Manual", owners: 2, registrationRTO: "TN", year: 2021, fuel: "Petrol", image: I20, condition: "Scratchless", variant: "Mid Variant" },
    { name: "Hyundai Creta", price: "₹10.5 Lakh", kmDriven: 78800, transmission: "Automatic", owners: 1, registrationRTO: "KA", year: 2019, fuel: "Diesel", image: Creta, condition: "Minor scratches", variant: "Top End" },
    { name: "Hyundai Verna", price: "₹7.5 Lakh", kmDriven: 42300, transmission: "Manual", owners: 3, registrationRTO: "KA", year: 2017, fuel: "Petrol", image: Verna, condition: "Scratchless", variant: "Base Model" },
    { name: "Tata Nexon", price: "₹7.0 Lakh", kmDriven: 38500, transmission: "Manual", owners: 1, registrationRTO: "MH", year: 2020, fuel: "Diesel", image: Nexon, condition: "Scratchless", variant: "Mid Variant" },
    { name: "Tata Harrier", price: "₹14.5 Lakh", kmDriven: 67200, transmission: "Automatic", owners: 2, registrationRTO: "KA", year: 2021, fuel: "Diesel", image: Harrier, condition: "Scratchless", variant: "Top End" },
    { name: "Tata Tiago", price: "₹5.0 Lakh", kmDriven: 24400, transmission: "Manual", owners: 1, registrationRTO: "KA", year: 2022, fuel: "CNG", image: Tiago, condition: "Scratchless", variant: "Base Model" },
    { name: "Honda City", price: "₹9.8 Lakh", kmDriven: 55300, transmission: "Manual", owners: 2, registrationRTO: "DL", year: 2019, fuel: "Petrol", image: HondaCity, condition: "Minor scratches", variant: "Mid Variant" },
    { name: "Honda Amaze", price: "₹6.3 Lakh", kmDriven: 30800, transmission: "Automatic", owners: 1, registrationRTO: "KA", year: 2021, fuel: "Diesel", image: HondaAmaze, condition: "Scratchless", variant: "Top End" },
    { name: "Honda Jazz", price: "₹6.7 Lakh", kmDriven: 49000, transmission: "Manual", owners: 2, registrationRTO: "KA", year: 2018, fuel: "Petrol", image: HondaJazz, condition: "Scratchless", variant: "Base Model" },
    { name: "Toyota Innova Crysta", price: "₹16.0 Lakh", kmDriven: 84200, transmission: "Manual", owners: 3, registrationRTO: "KA", year: 2019, fuel: "Diesel", image: Innova, condition: "Scratchless", variant: "Top End" },
    { name: "Toyota Glanza", price: "₹7.0 Lakh", kmDriven: 27800, transmission: "Automatic", owners: 1, registrationRTO: "MH", year: 2020, fuel: "Petrol", image: Glanza, condition: "Scratchless", variant: "Mid Variant" },
    { name: "Toyota Fortuner", price: "₹22.5 Lakh", kmDriven: 91500, transmission: "Manual", owners: 2, registrationRTO: "KA", year: 2018, fuel: "Diesel", image: Fortuner, condition: "Minor scratches", variant: "Top End" }
  ];

  // ✅ safer price parser
  const getNumericPrice = (priceStr) =>
    parseFloat(priceStr.replace(/[₹,\s]/g, "").replace("Lakh", ""));

  const maxCarPrice = Math.max(...usedCars.map(c => getNumericPrice(c.price)));
  const years = [...new Set(usedCars.map(car => car.year))].sort((a, b) => b - a);
  const fuels = [...new Set(usedCars.map(car => car.fuel))];
  const brands = [...new Set(usedCars.map(car => car.name.split(" ")[0]))];

  const [filters, setFilters] = useState({
    brand: "",
    transmission: "",
    owners: "",
    maxPrice: maxCarPrice,
    year: "",
    fuel: ""
  });

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  // Lock scroll when modal open
  useEffect(() => {
    if (selectedCar) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedCar]);

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const filteredCars = usedCars.filter(car => {
    const priceMatch = getNumericPrice(car.price) <= filters.maxPrice;
    const brandMatch = filters.brand ? car.name.startsWith(filters.brand) : true;
    const transMatch = filters.transmission ? car.transmission === filters.transmission : true;
    const fuelMatch = filters.fuel ? car.fuel === filters.fuel : true;

    let ownerMatch = true;
    if (filters.owners) {
      const selectedOwners = parseInt(filters.owners, 10);
      if (selectedOwners === 2) ownerMatch = car.owners <= 2;
      else if (selectedOwners === 3) ownerMatch = car.owners <= 3;
      else ownerMatch = car.owners === selectedOwners;
    }

    const yearMatch = filters.year ? car.year >= parseInt(filters.year, 10) : true;
    return brandMatch && transMatch && ownerMatch && priceMatch && yearMatch && fuelMatch;
  });

  // 🔐 Require login before navigating to /status
  function handleBook(car) {
  const role = localStorage.getItem("role");
  if (!role) {
    alert("Please login first to book a test ride!");
    navigate("/login");
    return;
  }

  setBookingData((prev) => [
    ...(prev || []),  // keep earlier bookings
    {
      ...car,
      mainService: "Used Cars",
      serviceName: car.name,
      status: "In Queue"
    },
  ]);

  setSelectedCar(null);
  navigate("/status");
}

  const styles = {
    wrapper: { display: "flex", fontFamily: "Arial, sans-serif", minHeight: "100vh", marginTop: "4rem", background: "#fff" },
    sidebar: { width: "250px", background: "#fff", padding: "1rem", boxSizing: "border-box", position: "sticky", top: "4rem", left: 0, borderRight: "1px solid #e0e0e0" },
    label: { display: "block", marginTop: "1rem", fontWeight: "bold" },
    select: { width: "100%", padding: "0.4rem", marginTop: "0.3rem", borderRadius: "4px", border: "1px solid #ccc" },
    range: { width: "100%", marginTop: "0.5rem" },
    grid: { flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", padding: "1rem", background: "#fff", justifyContent: "center", boxSizing: "border-box", minHeight: "calc(100vh - 4rem)", marginLeft: "250px" },
    card: { background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", cursor: "pointer", transition: "transform 0.3s ease, box-shadow 0.3s ease", height: "350px", display: "flex", flexDirection: "column" },
    cardHover: { transform: "translateY(-8px) scale(1.03)", boxShadow: "0 8px 20px rgba(0,0,0,0.15)" },
    image: { width: "100%", height: "160px", objectFit: "cover", backgroundColor: "#ddd", flexShrink: 0 }, // ✅ fixed
    cardContent: { flex: 1, padding: "0.6rem", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" },
    cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    carName: { margin: 0, fontWeight: "bold", fontSize: "1rem", color: "#e63333ff", lineHeight: "1.2", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
    price: { fontWeight: "bold", fontSize: "0.9rem", color: "#27ae60", marginLeft: "1rem" },
    kmDriven: { fontWeight: "bold", fontSize: "0.9rem", color: "#2c3e50" },
    pillContainer: { marginTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" },
    pill: { background: "#f1f3f5", padding: "0.25rem 0.5rem", borderRadius: "20px", fontSize: "0.8rem" }
  };

  const modalStyles = {
    overlay: {
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center"
    },
    modal: {
      background: "#fff", borderRadius: "12px", padding: "2rem",
      minWidth: "350px", maxWidth: "95vw",
      boxShadow: "0 2px 16px rgba(0,0,0,0.35)",
      display: "flex", flexDirection: "column",
      alignItems: "center", position: "relative"
    },
    closeBtn: {
      position: "absolute", top: "1rem", right: "1rem",
      background: "#eee", borderRadius: "50%",
      width: "32px", height: "32px",
      fontWeight: "bold", cursor: "pointer", border: "none"
    },
    image: {
      width: "320px", maxWidth: "100%", height: "180px",
      objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" // ✅ fixed
    },
    bookBtn: {
      marginTop: "1.5rem", padding: "0.7rem 2rem",
      background: "#ae2727ff", color: "#fff",
      border: "none", borderRadius: "6px",
      fontSize: "1rem", fontWeight: "bold",
      cursor: "pointer", transition: "background 0.2s"
    },
    warranty: {
      marginTop: "1.2rem", background: "#e8f8ef",
      padding: "0.6rem 1.2rem", borderRadius: "8px",
      color: "#298d60", fontWeight: "bold", textAlign: "center"
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Sidebar Filters */}
      <aside style={styles.sidebar}>
        <h3>Filters</h3>

        <label style={styles.label}>Max Price (Lakh)</label>
        <input
          type="range"
          min="1"
          max={maxCarPrice}
          step="0.5"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          style={styles.range}
        />
        <div>Up to ₹{filters.maxPrice} Lakh</div>

        <label style={styles.label}>Brand</label>
        <select name="brand" value={filters.brand} onChange={handleChange} style={styles.select}>
          <option value="">All</option>
          {brands.map((b, i) => <option key={i} value={b}>{b}</option>)}
        </select>

        <label style={styles.label}>Transmission</label>
        <select name="transmission" value={filters.transmission} onChange={handleChange} style={styles.select}>
          <option value="">All</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>

        <label style={styles.label}>Fuel Type</label>
        <select name="fuel" value={filters.fuel} onChange={handleChange} style={styles.select}>
          <option value="">All</option>
          {fuels.map((f, i) => <option key={i} value={f}>{f}</option>)}
        </select>

        <label style={styles.label}>Number of Owners</label>
        <select name="owners" value={filters.owners} onChange={handleChange} style={styles.select}>
          <option value="">All</option>
          <option value="1">1 Owner</option>
          <option value="2">2 Owners (≤2)</option>
          <option value="3">3 Owners (≤3)</option>
        </select>

        <label style={styles.label}>Model Year (and newer)</label>
        <select name="year" value={filters.year} onChange={handleChange} style={styles.select}>
          <option value="">All</option>
          {years.map((y, i) => <option key={i} value={y}>{y} &amp; above</option>)}
        </select>
      </aside>

      {/* Cars Grid */}
      <div style={styles.grid}>
        {filteredCars.map((car, i) => {
          const isHovered = i === hoveredIndex;
          return (
            <div
              key={i}
              style={{ ...styles.card, ...(isHovered ? styles.cardHover : {}) }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedCar(car)}
            >
              <img
                src={car.image || "https://via.placeholder.com/400x200?text=No+Image"}
                alt={car.name}
                style={styles.image}
              />
              <div style={styles.cardContent}>
                <div style={styles.cardHeader}>
                  <h4 style={styles.carName}>{car.name}</h4>
                  <span style={styles.price}>{car.price}</span>
                </div>
                <div style={styles.kmDriven}>{car.kmDriven} km</div>
                <div style={styles.pillContainer}>
                  <span style={styles.pill}>{car.year}</span>
                  <span style={styles.pill}>{car.fuel}</span>
                  <span style={styles.pill}>{car.transmission}</span>
                  <span style={styles.pill}>{car.owners} Owner{car.owners > 1 ? "s" : ""}</span>
                  <span style={styles.pill}>{car.registrationRTO}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedCar && (
        <div style={modalStyles.overlay} onClick={() => setSelectedCar(null)}>
          <div style={modalStyles.modal} onClick={e => e.stopPropagation()}>
            <button style={modalStyles.closeBtn} onClick={() => setSelectedCar(null)}>&times;</button>
            <img src={selectedCar.image} alt={selectedCar.name} style={modalStyles.image} />
            <h2>{selectedCar.name}</h2>
            <div style={{ marginBottom: "1rem", marginTop: "0.5rem", textAlign: "left", width: "100%" }}>
              <strong>Price:</strong> {selectedCar.price}<br />
              <strong>Kilometers Driven:</strong> {selectedCar.kmDriven} km<br />
              <strong>Transmission:</strong> {selectedCar.transmission}<br />
              <strong>Owners:</strong> {selectedCar.owners}<br />
              <strong>Year:</strong> {selectedCar.year}<br />
              <strong>Fuel:</strong> {selectedCar.fuel}<br />
              <strong>Registration RTO:</strong> {selectedCar.registrationRTO}<br />
              <strong>Condition:</strong> {selectedCar.condition}<br />
              <strong>Variant:</strong> {selectedCar.variant}<br />
            </div>
            <button style={modalStyles.bookBtn} onClick={() => handleBook(selectedCar)}>
              Book Test Ride
            </button>
            <div style={modalStyles.warranty}>We provide 1 year warranty on all used cars!</div>
          </div>
        </div>
      )}
    </div>
  );
}
