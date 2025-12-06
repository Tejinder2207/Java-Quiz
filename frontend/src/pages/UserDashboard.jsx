// src/pages/UserDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  // ✅ Get user email from localStorage
  const email = localStorage.getItem("userEmail") || "User";

  // ✅ Extract username (before '@')
  const username = email.includes("@") ? email.split("@")[0] : email;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>
          👋 Welcome, <span style={styles.user}>{username}</span>
        </h1>
        <p style={styles.text}>
          Ready to test your Java knowledge? Choose what you’d like to do below.
        </p>

        <button
          style={styles.quizButton}
          onClick={() => navigate("/quiz-selection")}
        >
          🧠 Attempt a Quiz
        </button>

        <button
          style={styles.resultButton}
          onClick={() => navigate("/results")}
        >
          📚 View My Results
        </button>

        <p style={styles.footerText}>
          Keep practicing and aim for a perfect 10/10! 💪
        </p>
      </div>
    </div>
  );
};

// ✅ Styles
const styles = {
  page: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9",
  },
  card: {
    width: "100%",
    maxWidth: "550px",
    background: "#fff",
    borderRadius: "16px",
    padding: "40px 30px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "15px",
    color: "#111",
  },
  user: {
    color: "#007bff",
    textTransform: "capitalize",
  },
  text: {
    color: "#444",
    fontSize: "16px",
    marginBottom: "30px",
  },
  quizButton: {
    width: "100%",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "14px 20px",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
    cursor: "pointer",
    transition: "0.3s",
  },
  resultButton: {
    width: "100%",
    backgroundColor: "#0096c7",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "14px 20px",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "20px",
    cursor: "pointer",
    transition: "0.3s",
  },
  footerText: {
    fontSize: "15px",
    color: "#555",
    marginTop: "10px",
  },
};

export default UserDashboard;
