import React from "react";
import { useNavigate } from "react-router-dom";

import "./TakeExam.css";

function TakeExam() {
  const navigate = useNavigate();

  const exams = [
    { id: 1, subject: "Math", date: "2025-09-15", time: "10:00 AM", type: "Scheduled" },
    { id: 2, subject: "Science", date: "2025-09-17", time: "2:00 PM", type: "Scheduled" },
    { id: 3, subject: "English", date: "2025-09-20", time: "11:00 AM", type: "Upcoming" },
  ];

  const today = new Date().toISOString().split("T")[0];
  const todaysExams = exams.filter((exam) => exam.date === today);
  const upcomingExams = exams.filter((exam) => new Date(exam.date) > new Date());

  const handleExamClick = (id) => {
    navigate(`/login?examId=${id}`);
  };

  // Group exams by date
  const groupedExams = exams.reduce((acc, exam) => {
    if (!acc[exam.date]) acc[exam.date] = [];
    acc[exam.date].push(exam);
    return acc;
  }, {});

  return (
    <div className="dashboard-layout">
      {/* Left: Exam Timeline */}
      <div className="exam-dashboard">
        <h1 className="timeline-title">📅 Exam Timeline</h1>

        <div className="exam-timeline">
          {Object.keys(groupedExams).map((date) => (
            <div key={date} className="exam-group">
              <h2 className="exam-date">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h2>

              {groupedExams[date].map((exam) => (
                <div
                  key={exam.id}
                  className="exam-item"
                  onClick={() => handleExamClick(exam.id)}
                >
                  <div className="exam-time">
                    <p>⏰ {exam.time}</p>/ {exam.time}
                  </div>
                  <div className="exam-details">
                    <div className="exam-subject">{exam.subject}</div>
                    <div className="exam-type">
                      {exam.type === "Scheduled" ? "Exam scheduled" : "Upcoming exam"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Summary Cards */}
      <div className="sidebar">
        <div className="summary-card">
          <h3>✅ Today's Schedule</h3>
          <p>{today}</p>
          {todaysExams.length > 0 ? (
            todaysExams.map((exam) => (
              <p key={exam.id}>{exam.subject} at {exam.time}</p>
            ))
          ) : (
            <div className="empty-msg">No events today <br/> Enjoy your free day!</div>
          )}
        </div>

        <div className="summary-card">
          <h3>🔔 Upcoming Exams</h3>
          {upcomingExams.length > 0 ? (
            upcomingExams.map((exam) => (
              <p key={exam.id}>
                {exam.subject} on {exam.date} at {exam.time}
              </p>
            ))
          ) : (
            <div className="empty-msg">No upcoming exams</div>
          )}
        </div>

        <div className="summary-card">
          <h3>📅 Quick Stats</h3>
          <p>Scheduled: {" "}<b>{exams.filter(e => e.type==="Scheduled").length}</b></p>
          <p>Upcoming: <b>{upcomingExams.length}</b></p>
          <p>Total: <b>{exams.length}</b></p>
        </div>
      </div>
    </div>
  );
}

export default TakeExam;

