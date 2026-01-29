function Navbar({ setIsLoggedIn, role }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
      <div className="container">
        <span className="navbar-brand">HireHub</span>

        <div className="ml-auto">
          {role === "jobseeker" && <span>Job Seeker Dashboard</span>}
          {role === "employer" && <span>Employer Dashboard</span>}
          {role === "admin" && <span>Admin Dashboard</span>}
          <button className="btn btn-danger btn-sm ml-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
