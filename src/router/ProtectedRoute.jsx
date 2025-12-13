import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/useAuth";

export const ProtectedRoute = ({ redirectTo = "/auth/login" }) => {
  const { token, loading } = useAuth();

  if (loading) return <div style={{ padding: 16 }}>Загрузка...</div>;

  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export const RoleRoute = ({ allowed, redirectTo = "/" }) => {
  const { token, role, loading } = useAuth();

  if (loading) return <div style={{ padding: 16 }}>Загрузка...</div>;

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  const allowedRoles = Array.isArray(allowed) ? allowed : [allowed];

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
