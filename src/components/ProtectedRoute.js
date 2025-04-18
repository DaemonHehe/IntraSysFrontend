// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("role");

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but wrong role, redirect to the appropriate dashboard
  if (requiredRole && userRole !== requiredRole) {
    const redirectPath =
      userRole === "student" ? "/main/dashboard" : "/lecturer/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  // If authenticated and correct role, show the requested component
  return children;
}

export default ProtectedRoute;
