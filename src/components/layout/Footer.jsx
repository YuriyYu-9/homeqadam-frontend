import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../ui/Container.jsx";

export default function Footer() {
  const { t } = useTranslation("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-white border-t">
      <Container>
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-gray-600">
            © {year} Osonly. {t("rights")}
          </div>

          <div className="flex flex-wrap text-sm gap-x-6 gap-y-2">
            <Link
              to="/legal"
              className="text-gray-700 hover:text-blue-600"
            >
              {t("terms")}
            </Link>
            <Link
              to="/privacy"
              className="text-gray-700 hover:text-blue-600"
            >
              {t("privacy")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
