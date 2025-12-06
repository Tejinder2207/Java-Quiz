import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Correct import
import { fetchResults } from "../../services/api";

const ExportPDFButton = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔎 Fetch results on mount
  useEffect(() => {
    fetchResults()
      .then((data) => {
        console.log("✅ Results fetched in ExportPDFButton:", data);
        if (Array.isArray(data)) {
          setResults(data);
        } else if (data?.results) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      })
      .catch((err) => console.error("❌ Error fetching results:", err))
      .finally(() => setLoading(false));
  }, []);

  // 📄 Export to PDF
  const downloadPDF = () => {
    console.log("📄 Current results before export:", results);
    if (!results || results.length === 0) {
      alert("⚠ No results available to export!");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Java Quiz - User Results", 14, 20);

    // ✅ use autoTable function directly
    autoTable(doc, {
      startY: 30,
      head: [["User", "Unit", "Score", "Total", "Date"]],
      body: results.map((r) => [
        r.user || "Anonymous",
        r.unit,
        r.score,
        r.total,
        new Date(r.date).toLocaleString(),
      ]),
      theme: "striped",
      headStyles: { fillColor: [0, 102, 204], textColor: 255, halign: "center" },
      bodyStyles: { halign: "center" },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    doc.save("quiz_results.pdf");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>📄 Export Quiz Results</h1>
        <p style={styles.subtext}>
          Click the button below to download all quiz results as a PDF file.
        </p>

        {loading ? (
          <p style={styles.loading}>⏳ Fetching results...</p>
        ) : results.length === 0 ? (
          <p style={styles.noResults}>⚠ No results found!</p>
        ) : (
          <button style={styles.button} onClick={downloadPDF}>
            ⬇ Export Results as PDF
          </button>
        )}
      </div>
    </div>
  );
};

// 🎨 Styles
const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(135deg, #f4f6f9, #e9efff)",
  },
  card: {
    background: "#fff",
    padding: "50px 60px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "90%",
    maxWidth: "600px",
    animation: "fadeIn 0.8s ease-in-out",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "15px",
    color: "#333",
  },
  subtext: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "30px",
  },
  loading: {
    fontSize: "18px",
    color: "#007bff",
  },
  noResults: {
    fontSize: "18px",
    color: "#dc3545",
  },
  button: {
    padding: "14px 30px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "18px",
    transition: "all 0.3s ease",
  },
};

export default ExportPDFButton;
