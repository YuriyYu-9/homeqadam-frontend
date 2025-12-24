import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../store/useAuth";

export const ProtectedRoute = () => {
  const { token, loading, initialized, profileCompleted } = useAuth();
  const location = useLocation();

  // ⛔ НИЧЕГО не решаем, пока auth не инициализирован
  if (!initialized || loading) {
    return <div className="px-4 py-16">Загрузка...</div>;
  }

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (location.pathname === "/profile/setup") {
    return <Outlet />;
  }

  if (!profileCompleted) {
    return <Navigate to="/profile/setup" replace />;
  }

  return <Outlet />;
};

export const RoleRoute = ({ allowed }) => {
  const { role, initialized } = useAuth();

  if (!initialized) {
    return <div className="px-4 py-16">Загрузка...</div>;
  }

  if (role !== allowed) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
