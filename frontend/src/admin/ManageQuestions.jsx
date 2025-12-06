// src/admin/ManageQuestions.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    unit: "",
    question: "",
    options: ["", "", "", ""],
    answer: "",
    difficulty: "easy",
  });
  const [editingQuestion, setEditingQuestion] = useState(null); // ✅ for modal

  // Fetch all questions
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/questions")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  // Add question
  const addQuestion = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/questions", newQuestion);
      setQuestions([...questions, res.data]);
      setNewQuestion({
        unit: "",
        question: "",
        options: ["", "", "", ""],
        answer: "",
        difficulty: "easy",
      });
    } catch (err) {
      console.error("Error adding question:", err);
    }
  };

  // Delete question
  const deleteQuestion = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/questions/${id}`);
      setQuestions(questions.filter((q) => q._id !== id));
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  // Save edited question
  const saveEdit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/questions/${editingQuestion._id}`,
        editingQuestion
      );
      setQuestions(
        questions.map((q) => (q._id === editingQuestion._id ? res.data : q))
      );
      setEditingQuestion(null); // close modal
    } catch (err) {
      console.error("Error updating question:", err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>🛠 Manage Questions</h1>

        {/* Add Question Form */}
        <form onSubmit={addQuestion} style={styles.form}>
          <input
            type="text"
            placeholder="Unit"
            value={newQuestion.unit}
            onChange={(e) => setNewQuestion({ ...newQuestion, unit: e.target.value })}
            style={styles.input}
            required
          />
          <textarea
            placeholder="Question"
            value={newQuestion.question}
            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
            style={styles.textarea}
            required
          />
          {newQuestion.options.map((opt, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => {
                const updated = [...newQuestion.options];
                updated[i] = e.target.value;
                setNewQuestion({ ...newQuestion, options: updated });
              }}
              style={styles.input}
              required
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={newQuestion.answer}
            onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
            style={styles.input}
            required
          />
          <select
            value={newQuestion.difficulty}
            onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
            style={styles.input}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button type="submit" style={styles.addButton}>
            ➕ Add Question
          </button>
        </form>

        {/* Questions Table */}
        <h2 style={styles.subheading}>📋 All Questions</h2>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableRow}>
              <th style={styles.tableHeader}>Unit</th>
              <th style={styles.tableHeader}>Question</th>
              <th style={styles.tableHeader}>Options</th>
              <th style={styles.tableHeader}>Answer</th>
              <th style={styles.tableHeader}>Difficulty</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, i) => (
              <tr
                key={q._id}
                style={{
                  ...styles.tableRow,
                  backgroundColor: i % 2 === 0 ? "#f9f9f9" : "#ffffff",
                }}
              >
                <td style={styles.tableCell}>{q.unit}</td>
                <td style={styles.tableCell}>{q.question}</td>
                <td style={styles.tableCell}>{q.options.join(", ")}</td>
                <td style={styles.tableCell}>{q.answer}</td>
                <td style={styles.tableCell}>{q.difficulty}</td>
                <td style={styles.actionCell}>
                  <button style={styles.editButton} onClick={() => setEditingQuestion(q)}>
                    ✏ Edit
                  </button>
                  <button style={styles.deleteButton} onClick={() => deleteQuestion(q._id)}>
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ✅ Edit Modal */}
        {editingQuestion && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h2>Edit Question</h2>
              <input
                type="text"
                value={editingQuestion.unit}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, unit: e.target.value })}
                style={styles.input}
              />
              <textarea
                value={editingQuestion.question}
                onChange={(e) =>
                  setEditingQuestion({ ...editingQuestion, question: e.target.value })
                }
                style={styles.textarea}
              />
              {editingQuestion.options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const updated = [...editingQuestion.options];
                    updated[i] = e.target.value;
                    setEditingQuestion({ ...editingQuestion, options: updated });
                  }}
                  style={styles.input}
                />
              ))}
              <input
                type="text"
                value={editingQuestion.answer}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, answer: e.target.value })}
                style={styles.input}
              />
              <select
                value={editingQuestion.difficulty}
                onChange={(e) =>
                  setEditingQuestion({ ...editingQuestion, difficulty: e.target.value })
                }
                style={styles.input}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button style={styles.saveButton} onClick={saveEdit}>
                  💾 Save
                </button>
                <button style={styles.cancelButton} onClick={() => setEditingQuestion(null)}>
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { width: "100vw", minHeight: "100vh", backgroundColor: "#f4f6f9", padding: "30px 0" },
  container: {
    width: "95%",
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
  heading: { fontSize: "28px", marginBottom: "20px", textAlign: "center" },
  subheading: { marginTop: "30px", marginBottom: "10px" },
  form: { display: "grid", gap: "10px", marginBottom: "20px" },
  input: { padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" },
  textarea: { padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" },
  addButton: {
    padding: "12px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "15px" },
  tableRow: { borderBottom: "1px solid #ddd" },
  tableHeader: { background: "#e9ecef", padding: "12px", textAlign: "left", fontWeight: "bold" },
  tableCell: { padding: "12px", textAlign: "left", verticalAlign: "top" },
  actionCell: { display: "flex", gap: "8px", justifyContent: "center" },
  editButton: {
    background: "#17a2b8",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "8px 12px",
    cursor: "pointer",
  },
  deleteButton: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "8px 12px",
    cursor: "pointer",
  },
  // ✅ Modal styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "500px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
  },
  saveButton: {
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
  },
  cancelButton: {
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
  },
};

export default ManageQuestions;
