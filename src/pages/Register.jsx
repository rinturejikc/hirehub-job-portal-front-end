import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";

function Register() {
  // ✅ State for input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        email,
        password,
        role
      });

      // ✅ Show success message
      setSuccess("Registration successful! You can now login.");
      setError("");

      // Optional: clear inputs
      setEmail("");
      setPassword("");
      setRole("user");

      // Optional: auto-redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);

    } catch (err) {
      setError("Registration failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        {/* ✅ Success & error messages */}
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

        {/* ✅ Role selector */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>

        <button onClick={handleRegister}>Register</button>

        <div className="auth-footer">
          Already have an account? <a href="/">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
