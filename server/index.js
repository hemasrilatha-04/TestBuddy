try {
  require('dotenv').config();
  console.log('✅ Environment variables loaded from .env file');
} catch (error) {
  console.log('❌ Failed to load .env file:', error.message);
  process.exit(1); // Stop server if .env fails
}

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Validate that MONGODB_URI exists
if (!process.env.MONGODB_URI) {
  console.log('❌ ERROR: MONGODB_URI is not defined in .env file');
  console.log('💡 Please create a .env file with MONGODB_URI=your_connection_string');
  process.exit(1);
}

const MONGODB_URI = process.env.MONGODB_URI;

console.log('🚀 Starting Exam Portal Server...');

// Connect to MongoDB with better options
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully!');
  console.log('📊 Database: exam_portal');
})
.catch((error) => {
  console.log('❌ MongoDB Connection Failed:', error.message);
  console.log('💡 Please check your MONGODB_URI in .env file');
  process.exit(1); // Stop server if DB connection fails
});

// Simple login
app.post('/api/auth/login', (req, res) => {
  const { username } = req.body || {};
  const isTeacher = (username || '').toLowerCase().includes('teacher');
  console.log(`🔐 Login: ${username} -> ${isTeacher ? 'TEACHER' : 'STUDENT'}`);
  res.json({ 
    token: 'demo-token', 
    role: isTeacher ? 'TEACHER' : 'STUDENT', 
    username 
  });
});

// Health check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({ 
    status: 'OK', 
    database: dbStatus,
    message: dbStatus === 'Connected' ? 'MongoDB is connected' : 'MongoDB is disconnected',
    timestamp: new Date().toISOString()
  });
});
// ==================== EXAM ENDPOINTS ====================

// Test exam creation endpoint
app.post('/api/exams/create', (req, res) => {
  const { examName, subject, duration, questions } = req.body;
  
  console.log('📝 Creating exam:', { examName, subject, duration });
  console.log('📋 Questions:', questions);
  
  // For now, just return success with the data
  res.json({
    success: true,
    message: 'Exam created successfully!',
    examData: {
      examId: 'EXAM_' + Date.now(),
      examName,
      subject, 
      duration,
      questions: questions || [],
      createdAt: new Date().toISOString()
    }
  });
});

// Get all exams endpoint
app.get('/api/exams', (req, res) => {
  console.log('📋 Fetching all exams');
  
  res.json({
    success: true,
    exams: [
      {
        id: 'EXAM_001',
        name: 'Mathematics Midterm',
        subject: 'Math',
        duration: 60,
        totalQuestions: 10,
        createdAt: new Date().toISOString()
      },
      {
        id: 'EXAM_002', 
        name: 'Science Quiz',
        subject: 'Science',
        duration: 30,
        totalQuestions: 5,
        createdAt: new Date().toISOString()
      }
    ]
  });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

const teacherSocketIds = new Set();

io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);
  
  socket.on('register_role', ({ role }) => {
    if (role === 'TEACHER') {
      teacherSocketIds.add(socket.id);
      console.log('👨‍🏫 Teacher registered:', socket.id);
    }
  });

  socket.on('exam_tab_switch', ({ student, examId }) => {
    console.log('🚨 Tab switch:', student, 'in exam:', examId);
    const payload = {
      type: 'TAB_SWITCH',
      student: student || 'Unknown Student',
      examId: examId || 'unknown',
      timestamp: new Date().toISOString()
    };
    teacherSocketIds.forEach((id) => {
      io.to(id).emit('teacher_alert', payload);
    });
  });

  socket.on('disconnect', () => {
    teacherSocketIds.delete(socket.id);
    console.log('🔌 Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Shutting down server gracefully...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed.');
  process.exit(0);
});