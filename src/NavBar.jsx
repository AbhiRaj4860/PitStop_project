import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // 🚪 Logout icon
import pitstop from "./assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/"); // redirect to homepage after logout
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo Container */}
      <div style={styles.logo}>
        <img src={pitstop} alt="Logo" style={styles.logoImage} />
        PitStop
      </div>

      {/* Navigation Links */}
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li>
          <Link to="#OurServices" style={styles.link}>Services</Link>
        </li>
        <li>
          <a href="#contact-us" style={styles.link}>About</a>
        </li>
        <li>
          <a href="#contact-us" style={styles.link}>Contact Us</a>
        </li>
        <li>
          <Link to="/status" style={styles.link}>Status</Link>
        </li>
        <li>
          {/* ✅ Conditional Login/Logout */}
          {isLoggedIn ? (
            <FaSignOutAlt
              size={26}
              title="Logout"
              style={{ cursor: "pointer", marginLeft: "20px" }}
              onClick={handleLogout}
            />
          ) : (
            <Link to="/login" style={styles.link}>Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fefefeff",
    color: "#000000ff",
    padding: "0 20px",
    height: "60px",
    width: "100%",
    boxSizing: "border-box",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    boxShadow: "0 4px 16px rgba(0,0,0,0.20)",
  },
  logo: {
    minWidth: "120px",
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    color: "#d30404ff",
    fontSize: "24px",
  },
  logoImage: {
    height: "40px",
    marginRight: "10px",
    borderRadius: "10px",
  },
  navLinks: {
    color: "#000000ff",
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "black",
    textDecoration: "none",
    marginLeft: "20px",
    fontSize: "18px",
  },
};

export default Navbar;
