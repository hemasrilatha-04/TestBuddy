// src/components/TeacherDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Sample data matching your image exactly
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalStudents: 127,
      activeExams: 3,
      alertsToday: 8,
      avgScore: 82
    },
    alerts: [
      {
        id: 1,
        student: "Sarah Johnson",
        exam: "Mathematics Final Exam",
        reason: "Tab switching detected",
        time: "2 min ago"
      },
      {
        id: 2,
        student: "Mike Chen",
        exam: "Mathematics Final Exam", 
        reason: "Multiple tab switches",
        time: "5 min ago"
      },
      {
        id: 3,
        student: "Emma Davis",
        exam: "Physics Chapter 5 Quiz",
        reason: "Long inactivity period",
        time: "1 hour ago"
      }
    ],
    exams: [
      {
        id: 1,
        title: "Mathematics Final Exam",
        students: 25
      },
      {
        id: 2, 
        title: "Physics Chapter 5 Quiz",
        students: 50
      }
    ]
  });

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.emit('teacher-join', { teacherId: '1' });

    newSocket.on('connect', () => {
      setIsConnected(true);
    });

    newSocket.on('violation-alert', (violation) => {
      // Add new alert to the beginning of the list
      setDashboardData(prev => ({
        ...prev,
        alerts: [{
          id: Date.now(),
          student: violation.studentName,
          exam: violation.examName,
          reason: violation.description,
          time: 'Just now'
        }, ...prev.alerts],
        stats: {
          ...prev.stats,
          alertsToday: prev.stats.alertsToday + 1
        }
      }));
    });

    return () => newSocket.close();
  }, []);

  const goBack = () => {
    navigate('/');
  };

  const navigateToCreateExam = () => {
    navigate('/create-exam');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={goBack} style={styles.backButton}>
          ← Back to Home
        </button>
        <div>
          <h1 style={styles.title}>Teacher Dashboard</h1>
          <p style={styles.subtitle}>Welcome back, Dr. Smith!</p>
        </div>
        <div style={styles.status}>
          Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </div>
      </div>

      {/* Stats Cards - Top Row */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={styles.statContent}>
            <h3 style={styles.statLabel}>Total Students</h3>
            <div style={styles.statValue}>{dashboardData.stats.totalStudents}</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statContent}>
            <h3 style={styles.statLabel}>Active Exams</h3>
            <div style={styles.statValue}>{dashboardData.stats.activeExams}</div>
            <div style={styles.statSubtext}>Currently running</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statContent}>
            <h3 style={styles.statLabel}>Alerts Today</h3>
            <div style={styles.statValue}>{dashboardData.stats.alertsToday}</div>
            <div style={styles.statSubtext}>Suspicious activities</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statContent}>
            <h3 style={styles.statLabel}>Avg Score</h3>
            <div style={styles.statValue}>{dashboardData.stats.avgScore}%</div>
            <div style={styles.statSubtext}>This semester</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={styles.gridContainer}>
        {/* Left Column */}
        <div style={styles.column}>
          {/* Create Exam Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Create Exam</h2>
            <p style={styles.cardDescription}>Design and publish new exams for students.</p>
            
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Create New Exam</h3>
            </div>
            
            <button style={styles.createButton} onClick={navigateToCreateExam}>
              Create Exam
            </button>
          </div>

          {/* View Results Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>View Results</h2>
            <p style={styles.cardDescription}>Analyze student performance and progress.</p>
            
            <div style={styles.resultsGrid}>
              <div style={styles.resultItem}>
                <span style={styles.resultLabel}>Total Exams</span>
                <strong style={styles.resultValue}>12</strong>
              </div>
              <div style={styles.resultItem}>
                <span style={styles.resultLabel}>Avg Score</span>
                <strong style={styles.resultValue}>82%</strong>
              </div>
            </div>
            
            <button style={styles.viewButton}>
              View All Results
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div style={styles.column}>
          {/* Recent Alerts Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Recent Alerts</h2>
            
            <div style={styles.alertsList}>
              {dashboardData.alerts.map((alert, index) => (
                <div key={alert.id} style={{
                  ...styles.alertItem,
                  borderBottom: index < dashboardData.alerts.length - 1 ? '1px solid #e0e0e0' : 'none',
                  padding: index === 0 ? '0 0 12px 0' : '12px 0',
                  marginTop: index === 0 ? '0' : '12px'
                }}>
                  <div style={styles.alertHeader}>
                    <strong style={styles.alertStudent}>{alert.student}</strong>
                  </div>
                  <div style={styles.alertExam}>{alert.exam}</div>
                  <div style={styles.alertReason}>{alert.reason}</div>
                  {alert.time && <div style={styles.alertTime}>{alert.time}</div>}
                </div>
              ))}
              
              {/* Additional alert items as shown in the image */}
              <div style={{...styles.alertItem, padding: '12px 0', borderBottom: '1px solid #e0e0e0'}}>
                <div style={styles.alertHeader}>
                  <strong style={styles.alertStudent}>Alerts Today</strong>
                </div>
                <div style={styles.alertReason}>Suspicious activities</div>
              </div>
              
              <div style={{...styles.alertItem, padding: '12px 0', borderBottom: '1px solid #e0e0e0'}}>
                <div style={styles.alertHeader}>
                  <strong style={styles.alertStudent}>Live Monitoring</strong>
                </div>
                <div style={styles.alertReason}>Avg Score: 82%</div>
                <div style={styles.alertTime}>This semester</div>
              </div>
              
              <div style={{...styles.alertItem, padding: '12px 0'}}>
                <div style={styles.alertHeader}>
                  <strong style={styles.alertStudent}>Course Exam</strong>
                </div>
                <div style={styles.alertTime}>The semester</div>
              </div>
            </div>
            
            <button style={styles.viewButton}>
              View All Alerts
            </button>
          </div>

          {/* Manage Students Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Manage Students</h2>
            <p style={styles.cardDescription}>Keep track of registered students and exams.</p>
            
            <div style={styles.studentsList}>
              {dashboardData.exams.map((exam, index) => (
                <div key={exam.id} style={{
                  ...styles.studentItem,
                  borderBottom: index < dashboardData.exams.length - 1 ? '1px solid #e0e0e0' : 'none',
                  padding: index === 0 ? '0 0 12px 0' : '12px 0'
                }}>
                  <div style={styles.studentExam}>{exam.title}</div>
                  <div style={styles.studentCount}>{exam.students} students</div>
                </div>
              ))}
              
              <div style={{...styles.studentItem, padding: '12px 0'}}>
                <div style={styles.studentExam}>Manage All Students</div>
                <div style={styles.studentCount}>127 students</div>
              </div>
            </div>
            
            <button style={styles.viewButton}>
              Manage All Students
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    padding: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
    gap: '20px'
  },
  backButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    minWidth: '120px'
  },
  title: {
    color: '#2c3e50',
    fontSize: '2.5rem',
    margin: '0 0 5px 0',
    fontWeight: '600'
  },
  subtitle: {
    color: '#7f8c8d',
    fontSize: '1.1rem',
    margin: '0'
  },
  status: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    minWidth: '140px',
    textAlign: 'center'
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '25px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    textAlign: 'center'
  },
  statContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  statLabel: {
    color: '#6c757d',
    fontSize: '0.9rem',
    fontWeight: '500',
    margin: '0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  statValue: {
    color: '#2c3e50',
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0'
  },
  statSubtext: {
    color: '#95a5a6',
    fontSize: '0.8rem',
    margin: '0'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    alignItems: 'start'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  },
  cardTitle: {
    color: '#2c3e50',
    fontSize: '1.4rem',
    fontWeight: '600',
    margin: '0 0 10px 0',
    borderBottom: '2px solid #3498db',
    paddingBottom: '10px'
  },
  cardDescription: {
    color: '#7f8c8d',
    fontSize: '0.95rem',
    margin: '0 0 20px 0',
    lineHeight: '1.5'
  },
  section: {
    borderTop: '1px solid #ecf0f1',
    paddingTop: '15px',
    marginBottom: '20px'
  },
  sectionTitle: {
    color: '#2c3e50',
    fontSize: '1.1rem',
    fontWeight: '500',
    margin: '0'
  },
  createButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.3s ease'
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '25px',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px'
  },
  resultItem: {
    textAlign: 'center'
  },
  resultLabel: {
    display: 'block',
    color: '#6c757d',
    fontSize: '0.9rem',
    marginBottom: '5px'
  },
  resultValue: {
    display: 'block',
    color: '#2c3e50',
    fontSize: '1.3rem',
    fontWeight: '600'
  },
  viewButton: {
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.3s ease'
  },
  alertsList: {
    marginBottom: '20px'
  },
  alertItem: {
    // Styles are applied inline for individual items
  },
  alertHeader: {
    marginBottom: '4px'
  },
  alertStudent: {
    color: '#2c3e50',
    fontSize: '1rem',
    fontWeight: '600'
  },
  alertExam: {
    color: '#7f8c8d',
    fontSize: '0.9rem',
    marginBottom: '2px'
  },
  alertReason: {
    color: '#e74c3c',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: '2px'
  },
  alertTime: {
    color: '#95a5a6',
    fontSize: '0.8rem',
    fontStyle: 'italic'
  },
  studentsList: {
    marginBottom: '20px'
  },
  studentItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  studentExam: {
    color: '#2c3e50',
    fontSize: '1rem',
    fontWeight: '500'
  },
  studentCount: {
    color: '#7f8c8d',
    fontSize: '0.9rem'
  }
};

// Add hover effects
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .create-button:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .view-button:hover {
    background-color: #7f8c8d;
    transform: translateY(-2px);
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    transition: all 0.3s ease;
  }
`, styleSheet.cssRules.length);

export default TeacherDashboard;