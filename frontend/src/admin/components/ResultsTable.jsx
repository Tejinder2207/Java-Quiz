import React, { useEffect, useState } from "react";
import { fetchResults } from "../../services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ correct import

const ResultsTable = () => {
  const [results, setResults] = useState([]);

  // ✅ Fetch results when page loads
  useEffect(() => {
    fetchResults()
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
  }, []);

  // ✅ Export results to PDF
  const downloadPDF = () => {
    if (!results || results.length === 0) {
      alert("⚠ No results available to export!");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Java Quiz - User Results", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [["User", "Unit", "Score", "Total", "Date"]],
      body: results.map((r) => [
        // ✅ Show username part of email (before "@")
        r.email ? r.email.split("@")[0] : r.user || "Anonymous",
        r.unit,
        r.score,
        r.total,
        new Date(r.date).toLocaleString(),
      ]),
      theme: "striped",
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        halign: "center",
      },
      bodyStyles: { halign: "center" },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    doc.save("quiz_results.pdf");
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>📑 View All Results</h1>

      {results.length === 0 ? (
        <p>No results available.</p>
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
                // ✅ Extract display name for admin table
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

      <button style={styles.button} onClick={downloadPDF}>
        ⬇ Download PDF
      </button>
    </div>
  );
};

// ✅ Styles
const styles = {
  page: {
    width: "100vw",
    minHeight: "100vh",
    padding: "30px",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  button: {
    marginTop: "20px",
    padding: "12px 25px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ResultsTable;
