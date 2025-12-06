// src/pages/QuizSelectionPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState("");

  const units = [
    "Overview of Java",
    "Data Types, Operators and Control Statements",
    "Classes, Objects and Methods",
    "Inheritance",
    "Package and Interfaces",
    "Exception Handling",
    "Multithreaded Programming",
    "I/O, Applets and Event Handling",
    "String Handling",
  ];

  const startQuiz = () => {
    if (!selectedUnit) {
      alert("⚠ Please select a unit before starting the quiz!");
      return;
    }
    navigate(`/quiz?unit=${encodeURIComponent(selectedUnit)}`);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Select a Java Unit</h1>
        <p style={styles.subheading}>Choose a unit and begin your quiz 🚀</p>

        <select
          style={styles.dropdown}
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
        >
          <option value="">-- Select Unit --</option>
          {units.map((unit, index) => (
            <option key={index} value={unit}>
              {unit}
            </option>
          ))}
        </select>

        <button style={styles.startButton} onClick={startQuiz}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

// ✅ Styles
const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    padding: "20px",
    width: "100vw",   // ✅ full width
    margin: 0,
  },
  container: {
    width: "100%",
    maxWidth: "700px",
    textAlign: "center",
    padding: "40px",
    borderRadius: "15px",
    backgroundColor: "#fff",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "15px",
    color: "#222",
  },
  subheading: {
    fontSize: "18px",
    marginBottom: "25px",
    color: "#555",
  },
  dropdown: {
    width: "100%",
    padding: "14px",
    fontSize: "18px",
    marginBottom: "25px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  startButton: {
    padding: "14px 30px",
    fontSize: "20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

export default QuizSelectionPage;
