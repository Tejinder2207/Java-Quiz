import React, { useState, useEffect } from "react";

const QuestionCard = ({
  question,
  onNext,
  onPrevious,
  selectedAnswer,
  isLast,
  currentIndex,
  totalQuestions,
}) => {
  const [selected, setSelected] = useState(selectedAnswer || null);

  useEffect(() => {
    setSelected(selectedAnswer || null);
  }, [question, selectedAnswer]);

  if (!question) {
    return <div style={styles.loading}>Loading question...</div>;
  }

  const handleSelect = (opt) => setSelected(opt);

  const handleNextClick = () => {
    if (!selected) {
      alert("Please select an option before continuing!");
      return;
    }
    onNext(selected === question.answer, selected);
  };

  const labels = ["(a)", "(b)", "(c)", "(d)"];

  const progressPercent = Math.round((currentIndex / totalQuestions) * 100);

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        {/* ✅ Progress Bar with Percentage */}
        <div style={styles.progressWrapper}>
          <div style={styles.progressHeader}>
            <span style={styles.progressText}>
              Question {currentIndex} of {totalQuestions}
            </span>
            <span style={styles.progressPercent}>{progressPercent}% Complete</span>
          </div>

          <div style={styles.progressBarContainer}>
            <div
              style={{
                ...styles.progressBarFill,
                width: `${progressPercent}%`,
              }}
            />
          </div>
        </div>

        <h3 style={styles.question}>{question.question}</h3>

        <div style={styles.optionsGrid}>
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              style={{
                ...styles.optionBtn,
                ...(selected === opt ? styles.selected : {}),
              }}
              onClick={() => handleSelect(opt)}
            >
              {labels[idx]} {opt}
            </button>
          ))}
        </div>

        <div style={styles.navButtons}>
          <button
            style={{ ...styles.navBtn, backgroundColor: "#28a745" }}
            onClick={onPrevious}
            disabled={currentIndex === 1}
          >
            ⬅ Previous
          </button>

          <button
            style={{ ...styles.navBtn, backgroundColor: "#28a745" }}
            onClick={handleNextClick}
          >
            {isLast ? "Submit ✅" : "Next ➡"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  loading: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
  },
  pageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    padding: "40px 0",
  },
  card: {
    width: "90%",
    maxWidth: "1100px",
    backgroundColor: "#fff",
    padding: "40px 50px",
    borderRadius: "15px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  question: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#222",
    marginBottom: "30px",
  },
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    justifyContent: "center",
    marginBottom: "30px",
  },
  optionBtn: {
    padding: "18px",
    fontSize: "17px",
    border: "2px solid #007bff",
    borderRadius: "10px",
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
    transition: "all 0.3s ease",
    width: "100%",
  },
  selected: {
    backgroundColor: "#28a745",
    color: "#fff",
  },
  navButtons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginTop: "10px",
  },
  navBtn: {
    padding: "14px 30px",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "0.3s ease",
  },
  /* ✅ Progress Bar Styles */
  progressWrapper: {
    marginBottom: "25px",
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  progressText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
  },
  progressPercent: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#28a745",
  },
  progressBarContainer: {
    height: "10px",
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "10px",
    backgroundColor: "#28a745",
    transition: "width 0.4s ease",
  },
};

export default QuestionCard;
