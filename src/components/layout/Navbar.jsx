import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo/Logo.png" alt="Osonly" className="h-8" />
          <span className="text-lg font-bold">Osonly</span>
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
