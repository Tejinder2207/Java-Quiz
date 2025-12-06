// src/components/ScoreBoard.jsx
import React from "react";

const ScoreBoard = ({ score, total, unit, userAnswers, onRetry, onQuit }) => {
  const percentage = ((score / total) * 100).toFixed(2);

  const getMessage = () => {
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 50) return "Good effort! 👍";
    return "Keep practicing! 💪";
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Quiz Finished</h2>
        <p style={styles.unit}>Unit: {unit}</p>
        <p style={styles.score}>
          You scored <b>{score}</b> out of <b>{total}</b>
        </p>
        <p style={styles.percent}>Percentage: {percentage}%</p>
        <p style={styles.message}>{getMessage()}</p>

        <h3 style={styles.reviewTitle}>Review Answers</h3>
        <div style={styles.reviewContainer}>
          {userAnswers.map((ans, index) => (
            <div key={index} style={styles.answerBlock}>
              <p>
                <strong>Q{index + 1}:</strong> {ans.question}
              </p>
              <p>
                Your Answer:{" "}
                <span
                  style={{
                    color: ans.isCorrect ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {ans.selectedAnswer}
                </span>
                {ans.isCorrect ? " ✅" : " ❌"}
              </p>
              {!ans.isCorrect && (
                <p>
                  Correct Answer:{" "}
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    {ans.correctAnswer}
                  </span>
                </p>
              )}
              <hr style={styles.separator} />
            </div>
          ))}
        </div>

        <div style={styles.buttons}>
          <button onClick={onRetry} style={styles.retryBtn}>
            🔁 Retry Quiz
          </button>
          <button onClick={onQuit} style={styles.quitBtn}>
            🚪 Quit
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Styles — full width + vertically centered
const styles = {
  pageWrapper: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9",
    padding: "40px 20px",
  },
  card: {
    width: "100%",
    maxWidth: "900px",
    background: "#fff",
    borderRadius: "12px",
    padding: "40px 50px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  unit: { fontSize: "18px", marginBottom: "15px" },
  score: { fontSize: "18px", marginBottom: "5px" },
  percent: { fontSize: "18px", marginBottom: "10px" },
  message: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "25px",
  },
  reviewTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  reviewContainer: {
    textAlign: "left",
    borderTop: "1px solid #ccc",
    paddingTop: "15px",
  },
  answerBlock: {
    marginBottom: "15px",
  },
  separator: {
    border: "none",
    borderTop: "1px solid #eee",
    margin: "10px 0",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
  },
  retryBtn: {
    padding: "12px 25px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
  quitBtn: {
    padding: "12px 25px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default ScoreBoard;
