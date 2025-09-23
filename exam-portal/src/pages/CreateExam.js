import React, { useState } from 'react';

const CreateExam = () => {
  const [questions, setQuestions] = useState([{
    id: 1,
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 1
  }]);

  const [examDetails, setExamDetails] = useState({
    title: '',
    subject: '',
    duration: 120,
    totalQuestions: 0,
    description: ''
  });

  const addQuestion = () => {
    setQuestions([...questions, {
      id: questions.length + 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 1
    }]);
  };

  const handleQuestionChange = (id, field, value) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === id) {
        return { ...q, [field]: value };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleExamDetailChange = (field, value) => {
    setExamDetails({ ...examDetails, [field]: value });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Create New Exam</h1>
      <p style={styles.subHeader}>Set up a new exam with questions and monitoring settings.</p>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Exam Details</h2>
        
        <div style={styles.formRow}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Exam Title</label>
            <input
              type="text"
              placeholder="e.g., Mathematics Final Exam"
              style={styles.input}
              value={examDetails.title}
              onChange={(e) => handleExamDetailChange('title', e.target.value)}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Subject</label>
            <select 
              style={styles.select}
              value={examDetails.subject}
              onChange={(e) => handleExamDetailChange('subject', e.target.value)}
            >
              <option value="">Select subject</option>
              <option value="math">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
            </select>
          </div>
        </div>
        
        <div style={styles.formRow}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Duration (minutes)</label>
            <input
              type="number"
              style={styles.input}
              value={examDetails.duration}
              onChange={(e) => handleExamDetailChange('duration', parseInt(e.target.value))}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Total Questions</label>
            <input
              type="number"
              style={styles.input}
              value={examDetails.totalQuestions}
              onChange={(e) => handleExamDetailChange('totalQuestions', parseInt(e.target.value))}
            />
          </div>
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Description (Optional)</label>
          <textarea
            placeholder="Exam instructions and description..."
            style={styles.textarea}
            value={examDetails.description}
            onChange={(e) => handleExamDetailChange('description', e.target.value)}
          />
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Questions</h2>
        
        {questions.map((question, index) => (
          <div key={question.id} style={styles.questionCard}>
            <h3 style={styles.questionTitle}>Question {index + 1}</h3>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Question</label>
              <input
                type="text"
                placeholder="Enter your question here..."
                style={styles.input}
                value={question.question}
                onChange={(e) => handleQuestionChange(question.id, 'question', e.target.value)}
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Answer Options</label>
              {question.options.map((option, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  style={styles.optionInput}
                  value={option}
                  onChange={(e) => handleOptionChange(question.id, optIndex, e.target.value)}
                />
              ))}
            </div>
            
            <div style={styles.formRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Correct Answer</label>
                <select 
                  style={styles.select}
                  value={question.correctAnswer}
                  onChange={(e) => handleQuestionChange(question.id, 'correctAnswer', e.target.value)}
                >
                  <option value="">Select correct answer</option>
                  {question.options.map((option, idx) => (
                    <option key={idx} value={option || `Option ${idx + 1}`}>
                      {option || `Option ${idx + 1}`}
                    </option>
                  ))}
                </select>
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Points</label>
                <input
                  type="number"
                  style={styles.input}
                  value={question.points}
                  onChange={(e) => handleQuestionChange(question.id, 'points', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        ))}
        
        <button style={styles.addButton} onClick={addQuestion}>
          + Add Question
        </button>
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
  header: {
    color: "#2c3e50",
    marginBottom: "10px"
  },
  subHeader: {
    color: "#7f8c8d",
    marginBottom: "30px"
  },
  section: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "25px",
    marginBottom: "30px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
  },
  sectionTitle: {
    color: "#2c3e50",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "1px solid #ecf0f1"
  },
  formRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px"
  },
  inputGroup: {
    flex: 1,
    marginBottom: "15px"
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "#2c3e50"
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    boxSizing: "border-box"
  },
  select: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    backgroundColor: "white",
    boxSizing: "border-box"
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    minHeight: "100px",
    resize: "vertical",
    boxSizing: "border-box"
  },
  questionCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    border: "1px solid #e9ecef"
  },
  questionTitle: {
    color: "#2c3e50",
    marginBottom: "15px"
  },
  optionInput: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    marginBottom: "10px",
    boxSizing: "border-box"
  },
  addButton: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "block",
    width: "100%",
    textAlign: "center"
  }
};

export default CreateExam;