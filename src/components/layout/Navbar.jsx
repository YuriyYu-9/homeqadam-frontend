import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/logo/Logo.png"
            alt="HomeQadam"
            className="h-8"
          />
          <span className="font-bold text-lg">HomeQadam</span>
        </Link>

        <nav className="flex gap-6">
          <Link to="/about">О нас</Link>
          <Link to="/auth/login">Войти</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
