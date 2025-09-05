import React from "react";


function StudentDashboard() {
  return (
    <div className="dashboard">
      <h2>Student Dashboard</h2>
      <div className="cards">
        <div className="card">
          <h3>Take Exam</h3>
          <p>Start and complete your assigned exams.</p>
        </div>
        <div className="card">
          <h3>View Scores</h3>
          <p>Check your exam results and progress reports.</p>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;

