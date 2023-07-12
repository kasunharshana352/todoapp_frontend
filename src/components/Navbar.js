import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link to="/" className="navbar__link">
            <button className="navbar__button">Home</button>
          </Link>
        </li>
        {!isAuthenticated && (
          <>
            <li className="navbar__item">
              <Link to="/signup" className="navbar__link">
                <button className="navbar__button">Signup</button>
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/login" className="navbar__link">
                <button className="navbar__button">Login</button>
              </Link>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li className="navbar__item">
              <Link to="/dashboard" className="navbar__link">
                <button className="navbar__button">Dashboard</button>
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/profile" className="navbar__link">
                <button className="navbar__button">Profile</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
