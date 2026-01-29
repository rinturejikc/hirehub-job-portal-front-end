import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login({ setIsLoggedIn, setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password
      });

      // ✅ Store token & role
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      setIsLoggedIn(true);
      setRole(response.data.role);

      // ✅ Show success message
      setSuccess("Login successful! Redirecting...");
      setError("");

      // ✅ Redirect based on role after 1.5 seconds
      setTimeout(() => {
        if (response.data.role === "jobseeker") navigate("/jobs");
        else if (response.data.role === "employer") navigate("/employer/dashboard");
        else if (response.data.role === "admin") navigate("/admin");
      }, 1500);

    } catch (err) {
      setError("Invalid email or password. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        {/* ✅ Show messages */}
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* ✅ Inputs */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <div className="auth-footer">
          Don’t have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
