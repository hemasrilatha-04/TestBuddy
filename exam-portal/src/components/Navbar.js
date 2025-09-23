// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <Link to="/" style={styles.logo}>
          Test Buddy
        </Link>
        
        <div style={styles.navLinks}>
          {user === 'student' && (
            <Link 
              to="/student" 
              style={{
                ...styles.navLink,
                ...(location.pathname === '/student' ? styles.activeLink : {})
              }}
            >
              Dashboard
            </Link>
          )}
          
          {user === 'teacher' && (
            <>
              <Link 
                to="/teacher" 
                style={{
                  ...styles.navLink,
                  ...(location.pathname === '/teacher' ? styles.activeLink : {})
                }}
              >
                Dashboard
              </Link>
              <Link 
                to="/create-exam" 
                style={{
                  ...styles.navLink,
                  ...(location.pathname === '/create-exam' ? styles.activeLink : {})
                }}
              >
                Create Exam
              </Link>
            </>
          )}
          
          {user ? (
            <button onClick={onLogout} style={styles.logoutButton}>
              Logout
            </button>
          ) : (
            <Link to="/" style={styles.navLink}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#2c3e50',
    padding: '0 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    height: '60px'
  },
  logo: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  },
  activeLink: {
    backgroundColor: '#3498db'
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default Navbar;