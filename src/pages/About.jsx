import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation("about");

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-4 text-gray-700">{t("text")}</p>
      </div>
    </section>
  );
}
