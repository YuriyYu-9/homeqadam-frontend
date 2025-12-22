import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../store/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, role, displayName, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);

  const onLogout = () => {
    logout();
    setOpen(false);
    navigate("/", { replace: true });
  };

  // dashboard по роли
  const dashboardLink =
    role === "CLIENT"
      ? "/client"
      : role === "TECHNICIAN"
      ? "/technician"
      : "/";

  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo/Logo.png" alt="Osonly" className="h-8" />
          <span className="text-lg font-bold">Osonly</span>
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-6">
          <Link to="/about" className="hover:text-blue-600">
            О нас
          </Link>

          {/* 🔐 Авторизованные */}
          {token && !loading && (
            <>
              {/* Dashboard */}
              <Link
                to={dashboardLink}
                className="font-medium hover:text-blue-600"
              >
                Dashboard
              </Link>

              {/* CLIENT */}
              {role === "CLIENT" && (
                <>
                  <Link
                    to="/client/orders/new"
                    className="hover:text-blue-600"
                  >
                    Сделать заказ
                  </Link>

                  <Link
                    to="/client/orders"
                    className="hover:text-blue-600"
                  >
                    Мои заказы
                  </Link>

                  <Link
                    to="/technicians"
                    className="hover:text-blue-600"
                  >
                    Найти мастера
                  </Link>
                </>
              )}

              {/* TECHNICIAN */}
              {role === "TECHNICIAN" && (
                <>
                  <Link
                    to="/technician/orders"
                    className="hover:text-blue-600"
                  >
                    Найти заказы
                  </Link>

                  <Link
                    to="/technician/orders/taken"
                    className="hover:text-blue-600"
                  >
                    Принятые заказы
                  </Link>
                </>
              )}
            </>
          )}

          {/* Публичная часть */}
          {!token && (
            <Link to="/auth/login" className="hover:text-blue-600">
              Войти
            </Link>
          )}
        </nav>

        {/* PROFILE DROPDOWN */}
        {token && (
          <div className="relative">
            <button
              className="px-3 py-2 border rounded-lg hover:bg-gray-50"
              onClick={() => setOpen((s) => !s)}
            >
              {displayName || "Профиль"} <span className="opacity-60">▾</span>
            </button>

            {open && (
              <div className="absolute right-0 w-48 mt-2 bg-white border rounded-lg shadow">
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile/setup");
                  }}
                >
                  Профиль
                </button>

                <button
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50"
                  onClick={onLogout}
                >
                  Выйти
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
