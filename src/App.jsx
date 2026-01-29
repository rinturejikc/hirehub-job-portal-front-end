import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar"; // ✅ make sure the path is correct

import Login from "./pages/Login";
import Register from "./pages/Register";
import JobSeeker from "./pages/JobSeeker";
import Employer from "./pages/Employer";
import Admin from "./pages/Admin";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));


  
         console.log("Role from localStorage:", localStorage.getItem("role"));
          console.log("Role from state:", role);
  return (
    <>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} role={role} />}

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={isLoggedIn ? (
            role === "jobseeker" ? <Navigate to="/jobs" /> :
            role === "employer" ? <Navigate to="/employer/dashboard" /> :
            role === "admin" ? <Navigate to="/admin" /> :
            <Navigate to="/" />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />

          )}
          

        />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/jobs"
          element={isLoggedIn && role === "jobseeker" ? <JobSeeker /> : <Navigate to="/" />}
        />
        <Route
          path="/employer/dashboard"
          element={isLoggedIn && role === "employer" ? <Employer /> : <Navigate to="/" />}
        />
        <Route
          path="/admin"
          element={isLoggedIn && role === "admin" ? <Admin /> : <Navigate to="/" />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
