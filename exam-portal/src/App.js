// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import CreateExam from './pages/CreateExam';
import ExamPage from './pages/ExamPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userType) => {
    setUser(userType);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route 
            path="/" 
            element={<HomePage onLogin={handleLogin} />} 
          />
          <Route 
            path="/student" 
            element={<StudentDashboard />} 
          />
          <Route 
            path="/teacher" 
            element={<TeacherDashboard />} 
          />
          <Route 
            path="/create-exam" 
            element={<CreateExam />} 
          />
          <Route 
            path="/exam/:examId" 
            element={<ExamPage />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;