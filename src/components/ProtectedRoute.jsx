import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-maroon-100 border-t-maroon-700" />
      </div>
    );
  }
  return isAuthenticated ? children : <Navigate to="/login" replace state={{ from: location }} />;
}
