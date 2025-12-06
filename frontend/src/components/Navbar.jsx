import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [username, setUsername] = useState("");
  const [hoveredLink, setHoveredLink] = useState(null); // ✅ track hovered link

  useEffect(() => {
    // ✅ Detect logged-in user or admin
    const email =
      localStorage.getItem("userEmail") || localStorage.getItem("adminEmail");

    if (email) {
      const namePart = email.split("@")[0];
      setUsername(namePart);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // 🔹 Helper to combine hover styles dynamically
  const getLinkStyle = (linkName) => ({
    ...styles.link,
    ...(hoveredLink === linkName ? styles.linkHover : {}),
  });

  return (
    <nav style={styles.navbar}>
      <div style={styles.inner}>
        <h2 style={styles.brand}>Java Quiz</h2>

        <div style={styles.links}>
          {/* ===== Public ===== */}
          {!token && (
            <>
              <Link
                to="/"
                style={getLinkStyle("home")}
                onMouseEnter={() => setHoveredLink("home")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Home
              </Link>
              <Link
                to="/login"
                style={getLinkStyle("login")}
                onMouseEnter={() => setHoveredLink("login")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                User Login
              </Link>
              <Link
                to="/register"
                style={getLinkStyle("register")}
                onMouseEnter={() => setHoveredLink("register")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Register
              </Link>
              <Link
                to="/admin/login"
                style={getLinkStyle("admin")}
                onMouseEnter={() => setHoveredLink("admin")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Admin Login
              </Link>
            </>
          )}

          {/* ===== User ===== */}
          {role === "user" && (
            <>
              <Link
                to="/quiz-selection"
                style={getLinkStyle("quiz")}
                onMouseEnter={() => setHoveredLink("quiz")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Attempt Quiz
              </Link>
              <Link
                to="/results"
                style={getLinkStyle("results")}
                onMouseEnter={() => setHoveredLink("results")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Results
              </Link>

              {username && (
                <span style={styles.welcome}>Welcome, {username}</span>
              )}

              <button style={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </>
          )}

          {/* ===== Admin ===== */}
          {role === "admin" && (
            <>
              <Link
                to="/admin/dashboard"
                style={getLinkStyle("dashboard")}
                onMouseEnter={() => setHoveredLink("dashboard")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/manage-questions"
                style={getLinkStyle("manage")}
                onMouseEnter={() => setHoveredLink("manage")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Manage Questions
              </Link>
              <Link
                to="/admin/view-results"
                style={getLinkStyle("view")}
                onMouseEnter={() => setHoveredLink("view")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                View Results
              </Link>
              <Link
                to="/admin/export-results"
                style={getLinkStyle("export")}
                onMouseEnter={() => setHoveredLink("export")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Export PDF
              </Link>

              {username && (
                <span style={styles.welcome}>Welcome, Admin {username}</span>
              )}

              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    width: "100vw",
    backgroundColor: "#0b132b",
    color: "#fff",
    padding: "12px 0",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
  },
  brand: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    transition: "all 0.3s ease",
    position: "relative",
  },
  // ✨ Hover effect style
  linkHover: {
    color: "#00ffcc",
    transform: "scale(1.1)",
    textShadow: "0 0 8px rgba(0, 255, 204, 0.5)",
  },
  welcome: {
    color: "#aee3f5",
    fontWeight: "bold",
    fontSize: "15px",
  },
  logoutBtn: {
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "6px 12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default Navbar;
