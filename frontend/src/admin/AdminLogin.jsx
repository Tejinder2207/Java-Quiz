import React, { useState } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Admin Login Successful!");
        // Save details in localStorage for navbar display
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "admin");
        localStorage.setItem("adminEmail", data.user?.email || email);
        localStorage.setItem("adminName", "Admin");

        window.location.href = "/admin/dashboard"; // redirect
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Admin Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* ✅ Toggle password visibility */}
          <input
            style={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <span style={{ marginLeft: "8px" }}>Show Password</span>
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>

          <div style={styles.linkContainer}>
            <p style={styles.linkText}>
              Forgot{" "}
              <a href="/forgot-password" style={styles.link}>
                Username / Password?
              </a>
            </p>
            <p style={styles.linkText}>
              Don't have an account?{" "}
              <a href="/register" style={styles.link}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  container: {
    width: "100%",
    maxWidth: "400px",
    padding: "25px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: { marginBottom: "20px", fontSize: "24px", fontWeight: "bold" },
  form: { display: "flex", flexDirection: "column" },
  input: {
    margin: "10px 0",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  checkboxContainer: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
  },
  button: {
    marginTop: "15px",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  linkContainer: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
  },
  linkText: {
    margin: "5px 0",
  },
  link: {
    color: "rgb(0,123,255)",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default AdminLogin;
