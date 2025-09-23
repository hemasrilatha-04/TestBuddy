// src/pages/StudentDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaClock, FaCheckCircle, FaListAlt } from 'react-icons/fa';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([
    {
      id: 1,
      title: "Mathematics Final Exam",
      subject: "Mathematics",
      duration: 120,
      questions: 50,
      dueDate: "2024-01-20",
      status: "available",
      score: null
    },
    {
      id: 2,
      title: "Physics Chapter 5 Quiz",
      subject: "Physics",
      duration: 45,
      questions: 20,
      dueDate: "2024-01-15",
      status: "available",
      score: null
    },
    {
      id: 3,
      title: "Chemistry Lab Report",
      subject: "Chemistry",
      duration: 60,
      questions: 15,
      dueDate: "2024-01-10",
      status: "completed",
      score: 85
    }
  ]);

  const stats = {
    totalExams: exams.length,
    completedExams: exams.filter(exam => exam.status === "completed").length,
    pendingExams: exams.filter(exam => exam.status === "available").length,
    averageScore: exams.filter(exam => exam.score).reduce((acc, exam) => acc + exam.score, 0) / 
                 exams.filter(exam => exam.score).length || 0
  };

  const startExam = (examId) => {
    navigate(`/exam/${examId}`);
  };

  const viewResults = (examId) => {
    alert(`Viewing results for exam ${examId}`);
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.header}>
        <button onClick={goBack} style={styles.backButton}>
          <FaArrowLeft style={styles.backIcon} />
          Back to Home
        </button>
        <h1 style={styles.title}>Student Dashboard</h1>
        <p style={styles.subtitle}>Welcome back, Alitol</p>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <FaListAlt />
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statTitle}>Total Exams</h3>
            <div style={styles.statValue}>{stats.totalExams}</div>
            <div style={styles.statDescription}>This semester</div>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <FaCheckCircle />
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statTitle}>Average Score</h3>
            <div style={styles.statValue}>{Math.round(stats.averageScore)}%</div>
            <div style={{...styles.statDescription, ...styles.positive}}>+9% from last month</div>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <FaClock />
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statTitle}>Pending Exams</h3>
            <div style={styles.statValue}>{stats.pendingExams}</div>
            <div style={styles.statDescription}>Due this week</div>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <FaCheckCircle />
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statTitle}>Completed</h3>
            <div style={styles.statValue}>{stats.completedExams}</div>
            <div style={styles.statDescription}>
              {stats.totalExams > 0 
                ? `${Math.round((stats.completedExams / stats.totalExams) * 100)}% completion rate` 
                : 'No exams'
              }
            </div>
          </div>
        </div>
      </div>

      <div style={styles.divider}></div>

      <div style={styles.examsSection}>
        <h2 style={styles.sectionTitle}>Available Exams</h2>
        
        {exams.filter(exam => exam.status === "available").map(exam => (
          <div key={exam.id} style={styles.examCard}>
            <div style={styles.examHeader}>
              <input type="checkbox" id={`exam-${exam.id}`} style={styles.checkbox} />
              <label htmlFor={`exam-${exam.id}`} style={styles.examLabel}>{exam.title}</label>
              <span style={styles.examSubject}>{exam.subject}</span>
            </div>
            <div style={styles.examDetails}>
              <span>{exam.duration} minutes</span>
              <span>{exam.questions} questions</span>
              <span style={styles.dueDate}>Due: {exam.dueDate}</span>
            </div>
            <button 
              style={{...styles.examButton, ...styles.startExam}} 
              onClick={() => startExam(exam.id)}
            >
              Start Exam
            </button>
          </div>
        ))}

        <h2 style={styles.sectionTitle}>Upcoming Exams</h2>
        
        {exams.filter(exam => exam.status === "pending").length > 0 ? (
          exams.filter(exam => exam.status === "pending").map(exam => (
            <div key={exam.id} style={styles.examCard}>
              <div style={styles.examHeader}>
                <input type="checkbox" id={`exam-${exam.id}`} style={styles.checkbox} />
                <label htmlFor={`exam-${exam.id}`} style={styles.examLabel}>{exam.title}</label>
                <span style={styles.examSubject}>{exam.subject}</span>
              </div>
              <div style={styles.examDetails}>
                <span>{exam.duration} minutes</span>
                <span>{exam.questions} questions</span>
                <span style={styles.dueDate}>Due: {exam.dueDate}</span>
              </div>
              <button style={{...styles.examButton, ...styles.disabledButton}} disabled>
                Not Available Yet
              </button>
            </div>
          ))
        ) : (
          <p style={styles.noExams}>No upcoming exams</p>
        )}
      </div>

      <div style={styles.completedExams}>
        <h2 style={styles.sectionTitle}>Completed Exams</h2>
        
        {exams.filter(exam => exam.status === "completed").map(exam => (
          <div key={exam.id} style={styles.completedExam}>
            <input 
              type="checkbox" 
              id={`completed-${exam.id}`} 
              checked 
              readOnly 
              style={styles.checkbox}
            />
            <label htmlFor={`completed-${exam.id}`} style={styles.completedLabel}>{exam.title}</label>
            <span style={styles.score}>Score: {exam.score}%</span>
            <button 
              style={styles.viewResultsBtn}
              onClick={() => viewResults(exam.id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    color: "#333",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh"
  },
  header: {
    marginBottom: "30px",
    position: "relative"
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    marginBottom: "15px"
  },
  backIcon: {
    fontSize: "14px"
  },
  title: {
    color: "#2c3e50",
    marginBottom: "5px",
    fontSize: "2rem"
  },
  subtitle: {
    color: "#7f8c8d",
    fontSize: "1.1rem"
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "30px",
    gap: "15px"
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    flex: "1",
    minWidth: "200px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  statIcon: {
    fontSize: "24px",
    color: "#3498db",
    backgroundColor: "#e8f4fc",
    padding: "12px",
    borderRadius: "8px"
  },
  statContent: {
    flex: 1
  },
  statTitle: {
    color: "#7f8c8d",
    fontSize: "0.9rem",
    marginBottom: "5px",
    fontWeight: "normal"
  },
  statValue: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "5px"
  },
  statDescription: {
    fontSize: "0.9rem",
    color: "#7f8c8d"
  },
  positive: {
    color: "#2ecc71"
  },
  divider: {
    border: "none",
    height: "1px",
    backgroundColor: "#ecf0f1",
    margin: "30px 0"
  },
  examsSection: {
    marginBottom: "30px"
  },
  sectionTitle: {
    color: "#2c3e50",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "1px solid #ecf0f1",
    fontSize: "1.5rem"
  },
  examCard: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "15px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
  },
  examHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
    gap: "10px"
  },
  checkbox: {
    transform: "scale(1.2)"
  },
  examLabel: {
    fontWeight: "bold",
    color: "#2c3e50",
    marginRight: "auto"
  },
  examSubject: {
    backgroundColor: "#e8f4fc",
    color: "#3498db",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "0.8rem"
  },
  examDetails: {
    display: "flex",
    gap: "15px",
    marginBottom: "15px",
    color: "#7f8c8d",
    fontSize: "0.9rem",
    flexWrap: "wrap"
  },
  dueDate: {
    marginLeft: "auto",
    fontWeight: "bold",
    color: "#e74c3c"
  },
  examButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  startExam: {
    backgroundColor: "#3498db",
    color: "white"
  },
  disabledButton: {
    backgroundColor: "#bdc3c7",
    color: "#7f8c8d",
    cursor: "not-allowed"
  },
  completedExams: {
    marginTop: "30px"
  },
  completedExam: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "10px"
  },
  completedLabel: {
    marginRight: "auto",
    textDecoration: "line-through",
    color: "#7f8c8d"
  },
  score: {
    fontWeight: "bold",
    color: "#2c3e50",
    marginRight: "10px"
  },
  viewResultsBtn: {
    padding: "6px 12px",
    backgroundColor: "#95a5a6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "0.8rem",
    cursor: "pointer"
  },
  noExams: {
    textAlign: "center",
    color: "#7f8c8d",
    fontStyle: "italic",
    padding: "20px"
  }
};

export default StudentDashboard;