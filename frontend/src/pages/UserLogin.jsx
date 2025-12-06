import React, { useState } from "react";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
  alert("✅ User Login Successful!");
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", "user");

  // ✅ NEW — store email for quiz/results
  localStorage.setItem("userEmail", email);
  window.location.href = "/dashboard";

}
 else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email:</label>
          <input
            style={styles.input}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label style={styles.label}>Password:</label>
          <input
            style={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
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
            SIGN IN
          </button>

          <div style={styles.linkContainer}>
            <p style={styles.linkText}>
              Forgot{" "}
              <a href="/forgot-password" style={styles.link}>
                Username / Password?
              </a>
            </p>
            <p style={styles.linkText}>
              Don’t have an account?{" "}
              <a href="/Register" style={styles.link}>
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
    padding: "30px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    textAlign: "left",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginTop: "10px",
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "500",
  },
  input: {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  checkboxContainer: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
  },
  button: {
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#28a745", // Green
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
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
    color: "#28a745",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default UserLogin;
