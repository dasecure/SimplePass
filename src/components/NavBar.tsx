import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav style={{
      backgroundColor: '#333',
      padding: '1rem',
    }}>
      <ul style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
      }}>
        <li style={{ margin: '0 1rem' }}><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
        <li style={{ margin: '0 1rem' }}><Link to="/how-it-works" style={{ color: 'white', textDecoration: 'none' }}>How This Works?</Link></li>
        <li style={{ margin: '0 1rem' }}><Link to="/faq" style={{ color: 'white', textDecoration: 'none' }}>FAQ</Link></li>
        <li style={{ margin: '0 1rem' }}><Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;