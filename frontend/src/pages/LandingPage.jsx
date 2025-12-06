// src/pages/LandingPage.jsx
import React from "react";

const LandingPage = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Welcome to Java Quiz App</h1>
      <p style={styles.subheading}>
        Test your Java skills, improve your knowledge, and track your progress!
      </p>

      {/* ✅ 6 Feature Boxes */}
      <div style={styles.featuresContainer}>
        <div style={styles.featureBox}>
          <h3>🧠 Attempt Quizzes</h3>
          <p>Challenge yourself with unit-wise Java quizzes and questions.</p>
        </div>

        <div style={styles.featureBox}>
          <h3>📊 Track Progress</h3>
          <p>Analyze your quiz history and measure improvement over time.</p>
        </div>

        <div style={styles.featureBox}>
          <h3>📘 Learn Java</h3>
          <p>Brush up your Java concepts with each topic-oriented test.</p>
        </div>

        <div style={styles.featureBox}>
          <h3>🧑‍💻 Admin Dashboard</h3>
          <p>Admins can manage questions, track users, and review results.</p>
        </div>

        <div style={styles.featureBox}>
          <h3>🏆 Earn Achievements</h3>
          <p>Score high and unlock achievements for consistent performance.</p>
        </div>

        <div style={styles.featureBox}>
          <h3>⚙️ Smart Evaluation</h3>
          <p>Instantly get your scores and detailed feedback after each quiz.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    width: "100vw",
    minHeight: "100vh",
    margin: 0,
    padding: "60px 20px",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "10px",
    textAlign: "center",
  },
  subheading: {
    fontSize: "18px",
    color: "#555",
    textAlign: "center",
    marginBottom: "40px",
  },
  featuresContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // ✅ 2 per row
    gap: "25px",
    width: "100%",
    maxWidth: "900px",
  },
  featureBox: {
    backgroundColor: "#fff",
    padding: "30px 25px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "default",
  },
  featureBoxHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
};

export default LandingPage;
