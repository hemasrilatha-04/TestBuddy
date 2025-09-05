import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Exam Portal</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/teacher">Teacher</Link>
        <Link to="/student">Student</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
