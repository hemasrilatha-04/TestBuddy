const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

// Simple login for demo. Role is derived from username content
app.post('/api/auth/login', (req, res) => {
  const { username } = req.body || {};
  const isTeacher = (username || '').toLowerCase().includes('teacher');
  res.json({ token: 'demo-token', role: isTeacher ? 'TEACHER' : 'STUDENT', username });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Track teachers by socket id
const teacherSocketIds = new Set();

io.on('connection', (socket) => {
  socket.on('register_role', ({ role }) => {
    if (role === 'TEACHER') {
      teacherSocketIds.add(socket.id);
    }
  });

  socket.on('exam_tab_switch', ({ student, examId }) => {
    const payload = {
      type: 'TAB_SWITCH',
      student: student || 'Unknown Student',
      examId: examId || 'unknown',
      timestamp: new Date().toISOString()
    };
    teacherSocketIds.forEach((id) => {
      const s = io.sockets.sockets.get(id);
      if (s) s.emit('teacher_alert', payload);
    });
  });

  socket.on('disconnect', () => {
    teacherSocketIds.delete(socket.id);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});



