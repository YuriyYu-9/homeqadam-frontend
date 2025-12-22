import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../store/useAuth";

export const ProtectedRoute = () => {
  const { token, loading, profileCompleted } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="px-4 py-16">Загрузка...</div>;
  }

  // ❌ Не авторизован — на логин
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  // ✅ Разрешаем страницу заполнения профиля ВСЕГДА
  if (location.pathname === "/profile/setup") {
    return <Outlet />;
  }

  // ❌ Профиль не заполнен — принудительно туда
  if (!profileCompleted) {
    return <Navigate to="/profile/setup" replace />;
  }

  // ✅ Всё ок
  return <Outlet />;
};

export const RoleRoute = ({ allowed }) => {
  const { role } = useAuth();

  if (role !== allowed) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
