import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import Footer from './Footer';
import { AuthContext } from './AuthContext';

import Car from './assets/home.jpg';
import service from './assets/service.jpg';
import spareparts from './assets/spareparts.jpg';
import inspection from './assets/inspection.jpg';
import roadsideast from './assets/roadsideassist.jpg';
import Customb from './assets/customb.jpg';
import Brand from './assets/Brand.jpg';

const services = [
  {
    title: 'Service',
    description: 'Expert maintenance and repairs for bikes and cars.',
    img: service,
    href: '/services'
  },
  {
    title: 'Spare Parts',
    description: 'Genuine spare parts for all makes and models.',
    img: spareparts,
    href: '/services'
  },
  {
    title: 'Custom Build',
    description: 'After Market Accessories, tuning, painting etc.',
    img: Customb,
    href: '/services'
  },
  {
    title: 'Used Vehicle Inspection',
    description: 'Comprehensive checks before you buy or sell.',
    img: inspection,
    href: '/services'
  },
  {
    title: 'Roadside Assist',
    description: '24/7 emergency help for breakdowns and towing.',
    img: roadsideast,
    href: '/services'
  }
];

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Handle click on service cards
  function handleServiceClick(e, path) {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowLoginModal(true); // show popup
    } else {
      navigate(path);
    }
  }

  return (
    <>
      <Navbar />

      {/* Main Page Container */}
      <div id="HomePage" style={styles.page}>

        {/* Hero Section */}
        <section style={styles.heroContainer}>
          <div style={styles.heroText}>
            <h2 style={{ margin: 0 }}>Welcome to Our Site</h2>
            <p style={{ marginTop: 16, lineHeight: 1.6 }}>
              Get reliable, expert-level maintenance and automotive services at your fingertips. We offer everything
              from inspections to roadside assistance — quick, professional, and affordable.
            </p>
          </div>
          <div style={styles.heroImage}>
            <img src={Car} alt="Welcome Banner" style={styles.heroImgTag} />
          </div>
        </section>

        {/* Services Section */}
        <section id="services">
          <h1 style={styles.title}>Our Services</h1>
          <div style={styles.cardGrid}>
            {services.map(service => (
              <div
                key={service.title}
                style={styles.cardLink}
                onClick={(e) => handleServiceClick(e, service.href)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === 'Enter') handleServiceClick(e, service.href) }}
              >
                <div style={styles.card}>
                  {service.img ? (
                    <img src={service.img} alt={service.title} style={styles.cardImg} />
                  ) : (
                    <div style={styles.imgPlaceholder}>Image coming soon</div>
                  )}
                  <h2 style={styles.cardTitle}>{service.title}</h2>
                  <p style={styles.cardDesc}>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Brands We Serve Section */}
      <section style={styles.brandsSection}>
        <h2 style={styles.brandsTitle}>Brands We Serve</h2>
        <div style={styles.brandImageContainer}>
          <Link
            to="/services"
            style={styles.viewMoreBtn}
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                setShowLoginModal(true);
              }
            }}
          >
            View More
          </Link>
        </div>
      </section>

      <Footer />

      {/* Login Modal */}
      {showLoginModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Please Login First</h3>
            <p>You need to be logged in to access this feature.</p>
            <div style={{ marginTop: 20 }}>
              <button
                style={styles.modalBtn}
                onClick={() => {
                  setShowLoginModal(false);
                  navigate('/login');
                }}
              >
                Go to Login
              </button>
              <button
                style={{ ...styles.modalBtn, backgroundColor: "#ccc", marginLeft: 10 }}
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  page: {
    width: '100%',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 16px 20px',
    boxSizing: 'border-box',
    minHeight: '80vh',
    backgroundColor: '#000',
  },
  heroContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: 400,
    boxSizing: 'border-box',
  },
  heroText: {
    flex: '1 1 40%',
    minWidth: 280,
    padding: '40px 20px',
    backgroundColor: '#e83733',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
  heroImage: {
    flex: '1 1 60%',
    minWidth: 280,
    height: '100%',
    overflow: 'hidden',
  },
  heroImgTag: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  title: {
    textAlign: 'center',
    margin: '40px 0 30px',
    color: '#000000',
    fontWeight: 'bold',
    fontSize: '2.4rem',
  },
  cardGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 32,
    justifyContent: 'center',
    width: '100%',
    boxSizing: 'border-box',
  },
  cardLink: {
    textDecoration: 'none',
    color: 'inherit',
    width: 240,
    cursor: 'pointer',
    outline: 'none',
  },
  card: {
    background: '#fff',
    borderRadius: 14,
    boxShadow: '0 4px 16px rgba(44,62,80,0.10)',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
    height: 350,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardImg: {
    flexBasis: '70%',
    width: '100%',
    height: 200,
    objectFit: 'cover',
    background: '#eee',
  },
  imgPlaceholder: {
    flexBasis: '70%',
    width: '100%',
    height: 200,
    background: '#eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#bbb',
    fontSize: '1.2rem',
  },
  cardTitle: {
    margin: '16px 0 8px',
    fontSize: '1.3rem',
    color: '#2d3142',
  },
  cardDesc: {
    padding: '0 16px',
    color: '#5a5a5a',
    fontSize: '1rem',
    textAlign: 'center',
    flexGrow: 1,
  },
  brandsSection: {
    padding: '40px 20px',
    textAlign: 'center',
    backgroundColor: '#000',
  },
  brandsTitle: {
    fontSize: '2rem',
    color: '#ff0000',
    marginBottom: 20,
  },
  brandImageContainer: {
    position: 'relative',
    backgroundImage: `url(${Brand})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: 400,
    borderRadius: 12,
    maxWidth: '90%',
    margin: '0 auto',
  },
  viewMoreBtn: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    padding: '10px 24px',
    backgroundColor: '#ff0000',
    color: '#000',
    textDecoration: 'none',
    borderRadius: 6,
    fontWeight: 'bold',
    fontSize: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
    cursor: 'pointer',
  },
  // Modal styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    minWidth: "300px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.25)"
  },
  modalBtn: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#ff0000",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default HomePage;
