import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaRegUser } from 'react-icons/fa';

const Navbarcomp = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarBrand}>CodeConquest</div>
      <ul style={styles.navItems}>
        {!user && (
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink}>Home</Link>
          </li>
        )}
        {user && (
          <>
            <li style={styles.navItem}>
              <Link to="/problems" style={styles.navLink}>Problems</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/contests" style={styles.navLink}>Contests</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/leaderboard" style={styles.navLink}>Leaderboard</Link>
            </li>
            {user.role === 'admin' && (
              <li style={styles.navItem}>
                <Link to="/admin" style={styles.navLink}>Admin Dashboard</Link>
              </li>
            )}
          </>
        )}
      </ul>
      {user ? (
        <div style={styles.navProfile}>
           <FaRegUser style={styles.profileIcon} />
          <button onClick={toggleDropdown} style={styles.profileButton}>
            <span style={styles.profileName}>{user.firstname}</span>
            
          </button>
          {dropdownOpen && (
            <div style={styles.dropdownMenu}>
              <Link to="/profile" style={styles.dropdownItem}>Profile</Link>
              <button onClick={logout} style={{ ...styles.dropdownItem, ...styles.logoutButton }}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <div style={styles.navItem}>
          <Link to="/login" style={styles.navLink}>Login</Link>
        </div>
      )}
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
  navProfile: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  profileButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
  },
  profileName: {
    marginRight: '10px',
  },
  profileIcon: {
    width: '30px',
    height: '30px',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '40px',
    right: 0,
    backgroundColor: '#fff',
    boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
    zIndex: 1000,
    borderRadius: '5px',
    overflow: 'hidden',
  },
  dropdownItem: {
    display: 'block',
    padding: '10px 20px',
    color: '#333',
    textDecoration: 'none',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
  },
  logoutButton: {
    border: 'none',
    background: 'none',
  },
};

export default Navbarcomp;
