import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../store/useAuth";
import { useTranslation } from "react-i18next";

/* Вынесенный NavItem */
const NavItem = ({ to, children, onClick }) => (
  <Link to={to} onClick={onClick} className="hover:text-blue-600">
    {children}
  </Link>
);

const Navbar = () => {
  const navigate = useNavigate();
  const { token, role, displayName, logout, loading } = useAuth();
  const { t } = useTranslation("navbar");

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const mobileRef = useRef(null);

  const dashboardLink =
    role === "CLIENT"
      ? "/client"
      : role === "TECHNICIAN"
      ? "/technician"
      : "/";

  const closeMobile = () => setMobileOpen(false);

  const onLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileOpen(false);
    navigate("/", { replace: true });
  };

  /* 🔹 Закрытие мобильного меню при клике вне */
  useEffect(() => {
    if (!mobileOpen) return;

    const handleClickOutside = (e) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        closeMobile();
      }
    };

    const handleScroll = () => closeMobile();

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
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
              <NavItem to={dashboardLink}>{t("dashboard")}</NavItem>

              {role === "CLIENT" && (
                <>
                  <NavItem to="/client/orders/new">
                    {t("createOrder")}
                  </NavItem>
                  <NavItem to="/client/orders">
                    {t("myOrders")}
                  </NavItem>
                  <NavItem to="/technicians">
                    {t("findTechnician")}
                  </NavItem>
                </>
              )}

              {role === "TECHNICIAN" && (
                <>
                  <NavItem to="/technician/orders">
                    {t("findOrders")}
                  </NavItem>
                  <NavItem to="/technician/orders/taken">
                    {t("takenOrders")}
                  </NavItem>
                </>
              )}

              {/* 🆕 ADMIN */}
              {role === "ADMIN" && (
                <NavItem to="/admin">Админка</NavItem>
              )}
            </>
          )}

          {!token && <NavItem to="/auth/login">{t("login")}</NavItem>}

          <NavItem to="/reviews">{t("reviews")}</NavItem>
          <NavItem to="/about">{t("about")}</NavItem>

          {/* ❌ LANGUAGE BUTTON — скрыт */}
        </nav>

        {/* PROFILE DESKTOP */}
        {token && (
          <div className="relative hidden md:block">
            <button
              onClick={() => setProfileOpen((s) => !s)}
              className="px-3 py-2 border rounded-lg hover:bg-gray-50"
            >
              {displayName || t("profile")}{" "}
              <span className="opacity-60">▾</span>
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
                  {t("profile")}
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50"
                  onClick={onLogout}
                >
                  {t("logout")}
                </button>
              </div>
            )}
          </div>
        )}

        {/* BURGER */}
        <button
          className="px-3 py-2 border rounded-lg md:hidden"
          onClick={() => setMobileOpen((s) => !s)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div ref={mobileRef} className="bg-white border-t md:hidden">
          <nav className="flex flex-col gap-3 px-4 py-4">
            {token && !loading && (
              <>
                <NavItem to={dashboardLink} onClick={closeMobile}>
                  {t("dashboard")}
                </NavItem>

                {role === "CLIENT" && (
                  <>
                    <NavItem
                      to="/client/orders/new"
                      onClick={closeMobile}
                    >
                      {t("createOrder")}
                    </NavItem>
                    <NavItem
                      to="/client/orders"
                      onClick={closeMobile}
                    >
                      {t("myOrders")}
                    </NavItem>
                    <NavItem
                      to="/technicians"
                      onClick={closeMobile}
                    >
                      {t("findTechnician")}
                    </NavItem>
                  </>
                )}

                {role === "TECHNICIAN" && (
                  <>
                    <NavItem
                      to="/technician/orders"
                      onClick={closeMobile}
                    >
                      {t("findOrders")}
                    </NavItem>
                    <NavItem
                      to="/technician/orders/taken"
                      onClick={closeMobile}
                    >
                      {t("takenOrders")}
                    </NavItem>
                  </>
                )}

                {/* 🆕 ADMIN */}
                {role === "ADMIN" && (
                  <NavItem to="/admin" onClick={closeMobile}>
                    Админка
                  </NavItem>
                )}
              </>
            )}

            {!token && (
              <NavItem to="/auth/login" onClick={closeMobile}>
                {t("login")}
              </NavItem>
            )}

            <NavItem to="/reviews" onClick={closeMobile}>
              {t("reviews")}
            </NavItem>
            <NavItem to="/about" onClick={closeMobile}>
              {t("about")}
            </NavItem>

            {/* ❌ LANGUAGE BUTTON — скрыт */}

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
                  {t("profile")}
                </button>
                <button
                  className="text-left text-red-600"
                  onClick={onLogout}
                >
                  {t("logout")}
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
