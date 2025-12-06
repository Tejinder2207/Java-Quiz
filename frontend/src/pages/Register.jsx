import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const registerUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // ❌ removed showPassword — not needed in backend
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ User Registered & Logged In Successfully!");
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userEmail", data.email);
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("User register error:", err);
    }
  };

  const registerAdmin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Admin Registered & Logged In Successfully!");
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminEmail", data.email);
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Admin register error:", err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Register</h2>
        <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* 👇 Dynamic password visibility */}
          <input
            style={styles.input}
            type={showPassword ? "text" : "password"} // ✅ key fix
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <span style={{ marginLeft: "8px" }}>Show Password</span>
          </div>

          <button
            type="button"
            style={{ ...styles.button, backgroundColor: "#28a745" }}
            onClick={registerUser}
          >
            Register as User
          </button>

          <button
            type="button"
            style={{ ...styles.button, backgroundColor: "#007bff" }}
            onClick={registerAdmin}
          >
            Register as Admin
          </button>

          <div style={styles.linkContainer}>
            <p style={styles.linkText}>
              Forgot{" "}
              <a href="/forgot-password" style={styles.link}>
                Username / Password?
              </a>
            </p>
            <p style={styles.linkText}>
              Already have an account?{" "}
              <a href="/Login" style={styles.link}>
                Login
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
  checkboxContainer: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
  },
  title: { marginBottom: "20px", fontSize: "24px", fontWeight: "bold" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: {
    margin: "10px 0",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  linkContainer: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
  },
  linkText: { margin: "5px 0" },
  link: {
    color: "#28a745",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default Register;
