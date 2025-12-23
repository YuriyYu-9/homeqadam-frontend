import { Link } from "react-router-dom";
import Container from "../ui/Container.jsx";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-white border-t">
      <Container>
        <div
          className="flex flex-col gap-6 py-10 text-center  md:flex-row md:items-center md:justify-between md:text-left"
        >
          {/* LEFT */}
          <div className="text-sm text-gray-600">
            © {year} <span className="font-medium">Osonly</span>. Все права защищены.
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center gap-3 text-sm md:flex-row md:gap-6">
            <Link
              to="/legal"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              Пользовательское соглашение
            </Link>

            <Link
              to="/privacy"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
