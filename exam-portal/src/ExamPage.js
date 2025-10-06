// ExamPage.js
import React, { useState, useEffect, useCallback } from 'react';

const ExamPage = () => {
  const [exam, setExam] = useState({
    title: "Mathematics Final Exam",
    subject: "Mathematics",
    duration: 120, // in minutes
    totalQuestions: 50,
    timeRemaining: 7200, // in seconds (120 minutes)
    questions: [
      {
        id: 1,
        question: "What is the derivative of x²?",
        options: ["x", "2x", "x²", "2x²"],
        selectedAnswer: ""
      },
      {
        id: 2,
        question: "Solve for x: 2x + 5 = 15",
        options: ["5", "10", "7.5", "5.5"],
        selectedAnswer: ""
      },
      // More questions would be loaded from an API in a real application
    ]
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [warningVisible, setWarningVisible] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);

  // Function to handle tab switching detection
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      // Tab switched or window minimized
      setTabSwitchCount(prev => prev + 1);
      setWarningVisible(true);
      
      // Send alert to faculty (in a real app, this would be an API call)
      console.log("ALERT: Student switched tabs during exam");
      
      // Hide warning after 5 seconds
      setTimeout(() => setWarningVisible(false), 5000);
    }
  }, []);

  // Set up event listeners for tab switching detection
  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleVisibilityChange);
    
    // Set up timer
    const timer = setInterval(() => {
      setExam(prev => {
        if (prev.timeRemaining <= 0) {
          clearInterval(timer);
          handleSubmitExam();
          return prev;
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    // Clean up event listeners and timer
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleVisibilityChange);
      clearInterval(timer);
    };
  }, [handleVisibilityChange]);

  const handleAnswerSelect = (questionIndex, answer) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions[questionIndex].selectedAnswer = answer;
    setExam({ ...exam, questions: updatedQuestions });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitExam = () => {
    setExamSubmitted(true);
    // In a real application, this would submit answers to the server
    console.log("Exam submitted");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (examSubmitted) {
    return (
      <div style={styles.container}>
        <div style={styles.submittedContainer}>
          <h2>Exam Submitted Successfully!</h2>
          <p>Your answers have been submitted for evaluation.</p>
          <p>You will be able to view your results once the exam period is over.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {warningVisible && (
        <div style={styles.warningBanner}>
          <h3>Warning: Tab Switch Detected</h3>
          <p>This incident has been reported to your instructor.</p>
          <p>Number of tab switches: {tabSwitchCount}</p>
        </div>
      )}
      
      <div style={styles.header}>
        <div style={styles.examInfo}>
          <h2>{exam.title}</h2>
          <p>Subject: {exam.subject}</p>
        </div>
        <div style={styles.timer}>
          <h3>Time Remaining</h3>
          <p style={styles.timeText}>{formatTime(exam.timeRemaining)}</p>
        </div>
      </div>

      <div style={styles.progressBar}>
        <div 
          style={{
            ...styles.progressFill,
            width: `${((currentQuestion + 1) / exam.questions.length) * 100}%`
          }}
        />
      </div>

      <div style={styles.questionNumber}>
        Question {currentQuestion + 1} of {exam.questions.length}
      </div>

      <div style={styles.questionContainer}>
        <h3 style={styles.questionText}>
          {exam.questions[currentQuestion].question}
        </h3>
        
        <div style={styles.optionsContainer}>
          {exam.questions[currentQuestion].options.map((option, index) => (
            <div 
              key={index}
              style={{
                ...styles.option,
                ...(exam.questions[currentQuestion].selectedAnswer === option 
                  ? styles.selectedOption : {})
              }}
              onClick={() => handleAnswerSelect(currentQuestion, option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.navigation}>
        <button 
          style={styles.navButton}
          onClick={handlePrevQuestion}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        
        <div style={styles.questionDots}>
          {exam.questions.map((_, index) => (
            <div 
              key={index}
              style={{
                ...styles.dot,
                ...(index === currentQuestion ? styles.activeDot : {}),
                ...(exam.questions[index].selectedAnswer ? styles.answeredDot : {})
              }}
              onClick={() => setCurrentQuestion(index)}
            />
          ))}
        </div>
        
        {currentQuestion === exam.questions.length - 1 ? (
          <button 
            style={styles.submitButton}
            onClick={handleSubmitExam}
          >
            Submit Exam
          </button>
        ) : (
          <button 
            style={styles.navButton}
            onClick={handleNextQuestion}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    color: "#333"
  },
  warningBanner: {
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    textAlign: "center"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  },
  examInfo: {
    flex: 2
  },
  timer: {
    textAlign: "center",
    flex: 1
  },
  timeText: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2c3e50"
  },
  progressBar: {
    height: "10px",
    backgroundColor: "#e9ecef",
    borderRadius: "5px",
    marginBottom: "20px",
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3498db",
    transition: "width 0.3s ease"
  },
  questionNumber: {
    textAlign: "center",
    fontSize: "1.2rem",
    marginBottom: "20px",
    color: "#6c757d"
  },
  questionContainer: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "25px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  },
  questionText: {
    marginBottom: "25px",
    fontSize: "1.3rem",
    color: "#2c3e50"
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  option: {
    padding: "15px",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  selectedOption: {
    backgroundColor: "#e8f4fc",
    borderColor: "#3498db",
    fontWeight: "bold"
  },
  navigation: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  navButton: {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px"
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold"
  },
  questionDots: {
    display: "flex",
    gap: "8px"
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#dee2e6",
    cursor: "pointer"
  },
  activeDot: {
    backgroundColor: "#3498db",
    transform: "scale(1.3)"
  },
  answeredDot: {
    backgroundColor: "#2ecc71"
  },
  submittedContainer: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginTop: "50px"
  }
};

export default ExamPage;