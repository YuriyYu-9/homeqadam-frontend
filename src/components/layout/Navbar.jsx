import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../store/useAuth";

/* ✅ ВАЖНО: компонент объявлен ВНЕ Navbar */
const NavItem = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="hover:text-blue-600"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const navigate = useNavigate();
  const { token, role, displayName, logout, loading } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  const onLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileOpen(false);
    navigate("/", { replace: true });
  };

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

        {/* DESKTOP NAV */}
        <nav className="items-center hidden gap-6 md:flex">
          {token && !loading && (
            <>
              <NavItem to={dashboardLink}>Dashboard</NavItem>

              {role === "CLIENT" && (
                <>
                  <NavItem to="/client/orders/new">Сделать заказ</NavItem>
                  <NavItem to="/client/orders">Мои заказы</NavItem>
                  <NavItem to="/technicians">Найти мастера</NavItem>
                </>
              )}

              {role === "TECHNICIAN" && (
                <>
                  <NavItem to="/technician/orders">Найти заказы</NavItem>
                  <NavItem to="/technician/orders/taken">
                    Принятые заказы
                  </NavItem>
                </>
              )}
            </>
          )}

          {!token && <NavItem to="/auth/login">Войти</NavItem>}

          <NavItem to="/reviews">Отзывы</NavItem>
          <NavItem to="/about">О нас</NavItem>
        </nav>

        {/* PROFILE (DESKTOP) */}
        {token && (
          <div className="relative hidden md:block">
            <button
              onClick={() => setProfileOpen((s) => !s)}
              className="px-3 py-2 border rounded-lg hover:bg-gray-50"
            >
              {displayName || "Профиль"} <span className="opacity-60">▾</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 w-48 mt-2 bg-white border rounded-lg shadow">
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                  onClick={() => {
                    setProfileOpen(false);
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

        {/* BURGER (MOBILE) */}
        <button
          className="px-3 py-2 border rounded-lg md:hidden"
          onClick={() => setMobileOpen((s) => !s)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="bg-white border-t md:hidden">
          <nav className="flex flex-col gap-3 px-4 py-4">
            {token && !loading && (
              <>
                <NavItem to={dashboardLink} onClick={closeMobile}>
                  Dashboard
                </NavItem>

                {role === "CLIENT" && (
                  <>
                    <NavItem to="/client/orders/new" onClick={closeMobile}>
                      Сделать заказ
                    </NavItem>
                    <NavItem to="/client/orders" onClick={closeMobile}>
                      Мои заказы
                    </NavItem>
                    <NavItem to="/technicians" onClick={closeMobile}>
                      Найти мастера
                    </NavItem>
                  </>
                )}

                {role === "TECHNICIAN" && (
                  <>
                    <NavItem to="/technician/orders" onClick={closeMobile}>
                      Найти заказы
                    </NavItem>
                    <NavItem to="/technician/orders/taken" onClick={closeMobile}>
                      Принятые заказы
                    </NavItem>
                  </>
                )}
              </>
            )}

            {!token && (
              <NavItem to="/auth/login" onClick={closeMobile}>
                Войти
              </NavItem>
            )}

            <NavItem to="/reviews" onClick={closeMobile}>
              Отзывы
            </NavItem>
            <NavItem to="/about" onClick={closeMobile}>
              О нас
            </NavItem>

            {token && (
              <>
                <hr />
                <button
                  className="text-left hover:text-blue-600"
                  onClick={() => {
                    closeMobile();
                    navigate("/profile/setup");
                  }}
                >
                  Профиль
                </button>
                <button
                  className="text-left text-red-600"
                  onClick={onLogout}
                >
                  Выйти
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
