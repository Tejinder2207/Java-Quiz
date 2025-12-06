// src/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchResults } from "../services/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults()
      .then((data) => setResults(data))
      .catch((err) => console.error("Error fetching results:", err));
  }, []);

  // 📊 Quick Stats
  const totalUsers = new Set(results.map((r) => r.user)).size || 0;
  const totalQuizzes = results.length;
  const avgScore =
    results.length > 0
      ? (results.reduce((acc, r) => acc + r.score, 0) / results.length).toFixed(2)
      : 0;
  const totalQuestions = results.length > 0 ? results[0].total : 0;

  // ✅ Extract username from email
  const getUsername = (email) => {
    if (!email) return "test";
    return email.split("@")[0];
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>📊 Admin Dashboard</h1>
        <p style={styles.subheading}>
          Welcome, Admin! Here’s an overview of the system activity.
        </p>

        {/* Stats Overview */}
        <div style={styles.statsGrid}>
          <div style={{ ...styles.card, backgroundColor: "#007bff", color: "#fff" }}>
            <h2>{totalUsers}</h2>
            <p>Total Users</p>
          </div>
          <div style={{ ...styles.card, backgroundColor: "#28a745", color: "#fff" }}>
            <h2>{totalQuizzes}</h2>
            <p>Quizzes Attempted</p>
          </div>
          <div style={{ ...styles.card, backgroundColor: "#fd7e14", color: "#fff" }}>
            <h2>{avgScore}</h2>
            <p>Average Score</p>
          </div>
          <div style={{ ...styles.card, backgroundColor: "#dc3545", color: "#fff" }}>
            <h2>{totalQuestions}</h2>
            <p>Questions per Quiz</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={styles.section}>
          <h3>📝 Recent Quiz Attempts</h3>
          {results.length === 0 ? (
            <p>No recent activity.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Unit</th>
                    <th>Score</th>
                    <th>Total</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {results.slice(0, 5).map((res, i) => (
                    <tr key={i}>
                      <td>{getUsername(res.user)}</td> {/* ✅ Only username */}
                      <td>{res.unit}</td>
                      <td>{res.score}</td>
                      <td>{res.total}</td>
                      <td>{new Date(res.date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Navigation */}
        <div style={styles.navSection}>
          <button
            style={styles.button}
            onClick={() => navigate("/admin/manage-questions")}
          >
            🛠 Manage Questions
          </button>
          <button
            style={styles.button}
            onClick={() => navigate("/admin/view-results")} // ✅ fixed path
          >
            📑 View Results
          </button>
          <button
            style={styles.button}
            onClick={() => navigate("/admin/export-results")} // ✅ fixed path
          >
            ⬇ Export PDF
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    padding: "30px 0",
  },
  container: {
    width: "95%",
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  subheading: {
    fontSize: "16px",
    marginBottom: "30px",
    color: "#555",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  section: {
    marginTop: "20px",
    textAlign: "left",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  navSection: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default AdminDashboard;
