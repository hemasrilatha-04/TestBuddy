import React from "react";
import { Link } from "react-router-dom";


function HomePage() {
  return (
    <div className="home">
      <h1>Welcome to TestBuddy</h1>
      <p>Manage your exams easily </p>
      <div className="home-buttons">
        <Link to="/teacher" className="btn teacher-btn">Teacher Dashboard</Link>
        <Link to="/student" className="btn student-btn">Student Dashboard</Link>
      </div>
    </div>
  );
}

export default HomePage;

