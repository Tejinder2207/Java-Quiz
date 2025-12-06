// src/pages/ResultsPage.jsx
import React, { useEffect, useState } from "react";
import { fetchResults } from "../services/api";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchResults(email)
      .then((data) => {
        if (Array.isArray(data)) {
          setResults(data);
        } else if (data?.results) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      })
      .catch((err) => console.error("❌ Error fetching results:", err));
  }, [email]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>📑 Your Quiz Results</h1>
        {results.length === 0 ? (
          <p>No results found.</p>
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
                {results.map((res, i) => {
                  // ✅ Extract username from email (before "@")
                  const displayUser =
                    res.email?.split("@")[0] || res.user || "Anonymous";

                  return (
                    <tr key={i}>
                      <td>{displayUser}</td>
                      <td>{res.unit}</td>
                      <td>{res.score}</td>
                      <td>{res.total}</td>
                      <td>{new Date(res.date).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 20px",
  },
  container: {
    width: "100%",
    maxWidth: "1200px",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 6px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "30px",
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};

export default ResultsPage;
