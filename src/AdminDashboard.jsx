import React, { useContext } from "react";
import { BookingContext } from "./App";

function AdminDashboard() {
  const { bookingData, setBookingData } = useContext(BookingContext);

  const updateBooking = (index, newStatus) => {
    const updated = bookingData.map((b, i) =>
      i === index ? { ...b, status: newStatus } : b
    );
    setBookingData(updated);
  };

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        marginTop: "80px", // 👈 pushes content below navbar
      }}
    >
      <h2 style={{ marginBottom: "10px", color: "#333" }}>👨‍💼 Admin Dashboard</h2>
      <p style={{ marginBottom: "20px", color: "#555", fontSize: "15px" }}>
        Hi Admin, welcome back! 👋  
        Here’s a quick look at the latest service bookings from customers.  
        You can <strong>accept</strong> a request to confirm the appointment, or{" "}
        <strong>reject</strong> it if the slot is not available.  
      </p>

      {!bookingData || bookingData.length === 0 ? (
        <div style={{ flex: 1 }}>
          <p style={{ color: "#777" }}>
            🚫 No bookings yet. Relax and grab a coffee ☕.  
            New bookings will show up here as soon as customers request them.
          </p>
        </div>
      ) : (
        <div style={{ flex: 1, overflowY: "auto" }}>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              minHeight: "300px",
            }}
          >
            <thead style={{ backgroundColor: "#f4f4f4" }}>
              <tr>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Main Service</th>
                <th style={thStyle}>Service Chosen</th>
                <th style={thStyle}>Preferred Date</th>
                <th style={thStyle}>Current Status</th>
                <th style={thStyle}>Your Action</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((b, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td style={tdStyle}>{b.name}</td>
                  <td style={tdStyle}>{b.mainService}</td>
                  <td style={tdStyle}>{b.serviceName}</td>
                  <td style={tdStyle}>{b.date || "Not Provided"}</td>
                  <td style={tdStyle}>{b.status}</td>
                  <td style={tdStyle}>
                    {b.status === "In Queue" ? (
                      <>
                        <button
                          onClick={() =>
                            updateBooking(index, "Appointment Fixed")
                          }
                          style={{
                            ...btnStyle,
                            backgroundColor: "#4CAF50",
                            marginRight: "8px",
                          }}
                        >
                          ✅ Accept
                        </button>
                        <button
                          onClick={() => updateBooking(index, "Rejected")}
                          style={{
                            ...btnStyle,
                            backgroundColor: "#f44336",
                          }}
                        >
                          ❌ Reject
                        </button>
                      </>
                    ) : (
                      <span style={{ color: "#555", fontSize: "14px" }}>
                        ✔ Status updated — no action needed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p style={{ marginTop: "15px", fontSize: "14px", color: "#666" }}>
            💡 <em>Tip:</em> Keep customers happy by updating their booking
            status quickly. A little speed goes a long way! 🚀
          </p>
        </div>
      )}
    </div>
  );
}

// ✅ Reusable styles
const thStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  fontWeight: "bold",
  color: "#333",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
};

const btnStyle = {
  border: "none",
  color: "white",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "0.3s",
};

export default AdminDashboard;
