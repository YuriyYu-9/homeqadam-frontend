import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";

export default function Footer() {
  const { t } = useTranslation("footer");
  const { t: tl } = useTranslation("legal");

  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div className="font-bold text-lg">{t("title")}</div>
            <div className="text-sm text-gray-600 mt-1">{t("subtitle")}</div>
            <div className="text-xs text-gray-500 mt-4">
              © {new Date().getFullYear()} {t("rights")}
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <Link className="hover:underline" to="/about">
              {t("about")}
            </Link>

            <button className="text-left hover:underline" onClick={() => setOpenTerms(true)}>
              {t("terms")}
            </button>

            <button className="text-left hover:underline" onClick={() => setOpenPrivacy(true)}>
              {t("privacy")}
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={openTerms}
        onClose={() => setOpenTerms(false)}
        title={tl("termsTitle")}
      >
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {tl("termsText")}
        </p>
      </Modal>

      <Modal
        open={openPrivacy}
        onClose={() => setOpenPrivacy(false)}
        title={tl("privacyTitle")}
      >
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {tl("privacyText")}
        </p>
      </Modal>
    </footer>
  );
}
