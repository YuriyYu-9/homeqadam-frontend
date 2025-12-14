import { Link } from "react-router-dom";
import Container from "../ui/Container.jsx";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-white border-t">
      <Container>
        <div className="flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-gray-600">
            © {year} Osonly. Все права защищены.
          </div>

          <div className="flex flex-wrap text-sm gap-x-6 gap-y-2">
            <Link to="/legal" className="text-gray-700 hover:text-blue-600">
              Пользовательское соглашение
            </Link>
            <Link to="/privacy" className="text-gray-700 hover:text-blue-600">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
