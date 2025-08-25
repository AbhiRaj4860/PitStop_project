import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages / Components
import Services from "./Services";
import ServiceBooking from "./ServiceBooking";
import SparePartsBooking from "./SparePartsBooking";
import CustomBuildBooking from "./CustomBuildBooking";
import UsedVehicleInspectionBooking from "./UsedVehicleInspectionBooking";
import RoadsideAssistBooking from "./RoadsideAssistBooking";
import Status from "./Status";
import Navbar from "./Navbar";
import Footer from "./Footer";
import UsedCars from "./UsedCars";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import { AuthProvider } from "./AutoContext";  

import "./App.css";

// Create Context so all forms + admin can access booking data
export const BookingContext = createContext();

// ✅ ProtectedRoute component
function ProtectedRoute({ children, allowedRole }) {
  const role = localStorage.getItem("role");
  if (!role || (allowedRole && role !== allowedRole)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [bookingData, setBookingData] = useState(null);

  // ✅ Add global bookings state for Admin
  const [bookings, setBookings] = useState([]);

  return (
    <AuthProvider>
      <BookingContext.Provider value={{ bookingData, setBookingData, bookings, setBookings }}>
        <Router>
          <Navbar />
          <Routes>
            {/* Home */}
            <Route path="/" element={<Services />} />

            {/* Protected Booking Forms (User Only) */}
            <Route
              path="/book/services"
              element={
                <ProtectedRoute allowedRole="User">
                  <ServiceBooking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book/spare-parts"
              element={
                <ProtectedRoute allowedRole="User">
                  <SparePartsBooking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book/custom-build"
              element={
                <ProtectedRoute allowedRole="User">
                  <CustomBuildBooking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book/used-vehicle-inspection"
              element={
                <ProtectedRoute allowedRole="User">
                  <UsedVehicleInspectionBooking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book/roadside-assist"
              element={
                <ProtectedRoute allowedRole="User">
                  <RoadsideAssistBooking />
                </ProtectedRoute>
              }
            />

            {/* Protected Status Page (User Only) */}
            <Route
              path="/status"
              element={
                <ProtectedRoute allowedRole="User">
                  <Status />
                </ProtectedRoute>
              }
            />

            {/* ✅ Admin Dashboard (Admin Only) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRole="Admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Public Pages */}
            <Route path="/usedcars" element={<UsedCars />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </Router>
      </BookingContext.Provider>
    </AuthProvider>
  );
}

export default App;
