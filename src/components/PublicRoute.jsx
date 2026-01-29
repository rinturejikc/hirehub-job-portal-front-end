import { Navigate } from "react-router-dom";

// If logged in → block login/register pages
function PublicRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return children;
}

export default PublicRoute;
