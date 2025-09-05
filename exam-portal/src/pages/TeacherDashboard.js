import React from "react";


function TeacherDashboard() {
  return (
    <div className="dashboard">
      <h2>Teacher Dashboard</h2>
      <div className="cards">
        <div className="card">
          <h3>Create Exam</h3>
          <p>Design and publish new exams for students.</p>
        </div>
        <div className="card">
          <h3>View Results</h3>
          <p>Analyze student performance and progress.</p>
        </div>
        <div className="card">
          <h3>Manage Students</h3>
          <p>Keep track of registered students and assign exams.</p>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;

