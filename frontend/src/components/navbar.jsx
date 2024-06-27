import React from 'react';
import { Link } from 'react-router-dom';

const Navbarcomp = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarBrand}>MyApp</div>
      <ul style={styles.navItems}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/about" style={styles.navLink}>About</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '10px 20px',
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1000,
    boxSizing: 'border-box',
  },
  navbarBrand: {
    color: '#fff',
    fontSize: '24px',
  },
  navItems: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Navbarcomp;



