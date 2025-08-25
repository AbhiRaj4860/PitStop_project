import React from 'react';
import { Link } from 'react-router-dom';
import Car from './assets/home.jpg';
import serviceImg from './assets/service.jpg';
// import spareparts from './assets/spareparts.jpg';
import spareparts from './assets/spares.jpg';
import inspection from './assets/inspection.jpg';
import roadside from './assets/roadsideassist.jpg';
import Custom from './assets/customb.jpg';
import Brand from './assets/Brand.jpg';
import homePit from './assets/homePit.jpg';
import used from './assets/usedbanner.jpg';

const services = [
  {
    title: 'Service',
    description: 'Expert maintenance and repairs for bikes and cars.',
    img: serviceImg,
    link: '/book/services'
  },
  {
    title: 'Spare Parts',
    description: 'Genuine spare parts for all makes and models.',
    img: spareparts,
    link: '/book/spare-parts'
  },
  {
    title: 'Custom Build',
    description: 'After Market Accessories, tuning, painting etc.',
    img: Custom,
    link: '/book/custom-build'
  },
  {
    title: 'Used Vehicle Inspection',
    description: 'Comprehensive checks before you buy or sell.',
    img: inspection,
    link: '/book/used-vehicle-inspection'
  },
  {
    title: 'Roadside Assist',
    description: '24/7 emergency help for breakdowns and towing.',
    img: roadside,
    link: '/book/roadside-assist'
  },
];

function Services() {
  return (
    <div id="HomePage" style={styles.page}>
      {/* Hero Section */}
      <div style={styles.heroContainer}>
        <div style={styles.heroText}>
          <h2 style={{ margin: 0 }}>Welcome to Our Site</h2>
          <p style={{ marginTop: '16px', lineHeight: '1.6' }}>
            Get reliable, expert-level maintenance and automotive services at your fingertips.
            We offer everything from inspections to roadside assistance — quick, professional, and affordable.
          </p>
        </div>
        <div style={styles.heroImage}>
          <img
            src={homePit}
            alt="Welcome Banner"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </div>

      {/* Services Section */}
      <h1 style={styles.title}>Our Services</h1>
      <div id="OurServices" style={styles.cardGrid}>
        {services.map((service) => (
          <Link
            to={service.link}
            key={service.title}
            style={styles.cardLink}
          >
            <div className="service-card" style={styles.card}>
              <div style={styles.imageWrapper}>
                {service.img ? (
                  <img src={service.img} alt={service.title} style={styles.cardImg} />
                ) : (
                  <div style={styles.cardPlaceholder}>Image coming soon</div>
                )}
                <div style={styles.imageOverlay}></div>
                <div style={styles.textOverlay}>
                  <h2 style={styles.cardTitle}>{service.title}</h2>
                  <p style={styles.cardDesc}>{service.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* ✅ Used Cars Banner */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#090801ff' }}>
          Best Used Cars
        </h2>
        <Link to="/usedcars" style={styles.fullWidthBackgroundLink}>
          <div style={styles.fullWidthBackgroundImage}></div>
        </Link>
      </div>


      {/* Brands Section */}
      <div style={styles.brandsSection}>
        <h2 style={styles.brandsTitle}>Brands We Serve</h2>
        <div style={styles.brandsImage}></div>
      </div>

      
      {/* Hover CSS */}
      <style>
  {`
    .service-card {
      background-color: white;  
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      z-index: 1;
    }
    .service-card:hover {
      transform: scale(1.15);
      z-index: 10;               /* bring on top */
      box-shadow: 0 8px 20px rgba(0,0,0,0.2); 
    }
  `}
</style>
    </div>
  );
}

const styles = {
  page: { padding: '0 0 20px 0', minHeight: '80vh', background: '#ffffffff' },
  heroContainer: { display: 'flex', width: '100%', height: '400px' },
  heroText: {
    width: '40%', padding: '40px 30px', backgroundColor: '#f60505ff', color: '#ffffffff',
    display: 'flex', flexDirection: 'column', justifyContent: 'center'
  },
  heroImage: { width: '60%', height: '100%', overflow: 'hidden' },
  title: {
    textAlign: 'center', margin: '40px 0 30px', color: '#000000ff',
    fontWeight: 'bold', fontSize: '2.4rem'
  },
  cardGrid: { display: 'flex', flexWrap: 'wrap', gap: '0px', justifyContent: 'center' },
  cardLink: { textDecoration: 'none', color: 'inherit', width: '240px' },
  card: {
    borderRadius: '0px',
    boxShadow: '0 4px 16px rgba(53, 41, 41, 1)',
    overflow: 'hidden',
    cursor: 'pointer',
    height: '350px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  cardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  },
  cardPlaceholder: {
    width: '100%',
    height: '100%',
    background: '#eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#bbb',
    fontSize: '1.2rem'
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '50%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
    zIndex: 1
  },
  textOverlay: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    zIndex: 2,
    color: 'white',
    paddingRight: '10px'
  },
  cardTitle: {
    fontSize: '1.3rem',
    margin: 0,
    background: 'linear-gradient(90deg, #ffcc00, #ff3366)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    fontWeight: 'bold'
  },
  cardDesc: {
    fontSize: '0.9rem',
    color: '#ccc',
    marginTop: '5px'
  },
  brandsSection: { padding: '40px 20px', textAlign: 'center', background: '#ffffffff' },
  brandsTitle: { fontSize: '2rem', color: '#000000ff', marginBottom: '20px' },
  brandsImage: {
    position: 'relative',
    backgroundImage: `url(${Brand})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '400px', borderRadius: '12px', maxWidth: '90%', margin: '0 auto'
  },
  fullWidthBackgroundLink: {
    display: 'block',
    width: '100%',
    height: '300px',
    maxWidth: '100%',
    margin: '40px 0',
    textDecoration: 'none',
  },
  fullWidthBackgroundImage: {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${used})`,
    backgroundSize: '1200px,500px' ,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
  }
};

export default Services;
