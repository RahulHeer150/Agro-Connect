import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isLoggedIn, loading } = useAuth();

  if (loading) {
    return <Loader size="large" />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;
