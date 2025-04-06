import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="navbar-title" style={{ cursor: "pointer" }}>Job Tracker</h1>
        </Link>
        <div className="navbar-links">
          <Link className="navbar-link" to="/">Home</Link>
          <Link className="navbar-link" to="/add">Add Job</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;