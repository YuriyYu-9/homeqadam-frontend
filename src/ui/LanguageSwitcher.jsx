import { useTranslation } from "react-i18next";

const langs = [
  { code: "ru", label: "RU" },
  { code: "uz", label: "UZ" },
  { code: "en", label: "EN" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const setLang = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("hq_lang", code);
  };

  return (
    <div className="flex items-center gap-2">
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-2 py-1 text-xs border rounded ${
            i18n.language === l.code ? "bg-gray-900 text-white" : "bg-white"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
