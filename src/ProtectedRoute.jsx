// src/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const role = localStorage.getItem("role"); // check login

  if (!role) {
    // not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // logged in → allow
}
