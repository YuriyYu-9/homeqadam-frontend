import { Navigate } from "react-router-dom";
import { useAuth } from "../store/useAuth";

const AppEntry = () => {
  const { loading, token, role, profileCompleted } = useAuth();

  if (loading) {
    return <div className="px-4 py-16">Загрузка...</div>;
  }

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!profileCompleted) {
    return <Navigate to="/profile/setup" replace />;
  }

  if (role === "CLIENT") {
    return <Navigate to="/client" replace />;
  }

  if (role === "TECHNICIAN") {
    return <Navigate to="/technician" replace />;
  }

  return <Navigate to="/" replace />;
};

export default AppEntry;
