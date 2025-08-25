import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import footerCrop from './assets/footerCrop.jpg';

function Footer() {
  return (
    <footer id="contact-us" style={styles.footer}>
      <div style={styles.container}>
        {/* About Section */}
        <div style={styles.section}>
          <h3 style={styles.heading}>About Us</h3>
          <p style={styles.text}>
            Pitstop offers expert bike and car servicing at your doorstep or in-center. 
            Genuine parts, easy booking, and trusted care to keep you moving.
          </p>
        </div>

        {/* Quick Links */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Quick Links</h3>
          <ul style={styles.list}>
            <li><a href="#home" style={styles.link}>Home</a></li>
            <li><a href="#services" style={styles.link}>Services</a></li>
            <li><a href="#about" style={styles.link}>About</a></li>
            <li><a href="#Status" style={styles.link}>Status</a></li>
          </ul>
        </div>

        {/* Social Media with Icons */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Follow Us</h3>
          <div style={styles.socialIcons}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              style={styles.socialLink}
              aria-label="Facebook"
            >
              <FaFacebook size={24} style={{ marginRight: 8 }} /> Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              style={styles.socialLink}
              aria-label="Twitter"
            >
              <FaTwitter size={24} style={{ marginRight: 8 }} /> Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={styles.socialLink}
              aria-label="Instagram"
            >
              <FaInstagram size={24} style={{ marginRight: 8 }} /> Instagram
            </a>
          </div>
        </div>
      </div>

      <div style={styles.bottomBar}>
        Thank You for Using PitStop, Visit Again
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundImage: `linear-gradient(rgba(255, 6, 6, 0.46), rgba(255, 6, 6, 0.52)), url(${footerCrop})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#fff",
    marginTop: "auto",
    marginBottom: "0px",
    width: "100vw",
    boxSizing: "border-box",
    padding: "40px 0 20px 0",
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '60px',
    width: '100%',         // <--- full width (no extra space at left)
    padding: '0 40px',     // <--- you can reduce/increase this if you want less/more spacing on sides
    boxSizing: 'border-box',
  },
  section: {
    flex: '1 1 250px',
    marginBottom: '10px',
    paddingRight: '20px',
    minWidth: '200px',
  },
  heading: {
    marginBottom: '10px',
    fontSize: '20px',
    borderBottom: '2px solid #fff',
    paddingBottom: '6px',
    color: '#fff',
  },
  text: {
    fontSize: '16px',
    lineHeight: '1.5',
    textAlign: 'justify',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
  },
  socialIcons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  socialLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
  },
  bottomBar: {
    borderTop: '1px solid #444',
    marginTop: '20px',
    paddingTop: '15px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#aaa',
  },
};

export default Footer;
