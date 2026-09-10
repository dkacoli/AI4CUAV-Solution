import { Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

// Admin pages call endpoints that require a Bearer token (see services/apiClient.js).
// Gate them here too so an anonymous visitor gets sent to /login instead of a
// page that silently fails every request with 401/403.
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return children;
}
