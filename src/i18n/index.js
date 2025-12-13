import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ruNavbar from "./locales/ru/navbar.json";
import ruFooter from "./locales/ru/footer.json";
import ruHome from "./locales/ru/home.json";
import ruLegal from "./locales/ru/legal.json";
import ruAbout from "./locales/ru/about.json";

import uzNavbar from "./locales/uz/navbar.json";
import uzFooter from "./locales/uz/footer.json";
import uzHome from "./locales/uz/home.json";
import uzLegal from "./locales/uz/legal.json";
import uzAbout from "./locales/uz/about.json";

import enNavbar from "./locales/en/navbar.json";
import enFooter from "./locales/en/footer.json";
import enHome from "./locales/en/home.json";
import enLegal from "./locales/en/legal.json";
import enAbout from "./locales/en/about.json";

const resources = {
  ru: { navbar: ruNavbar, footer: ruFooter, home: ruHome, legal: ruLegal, about: ruAbout },
  uz: { navbar: uzNavbar, footer: uzFooter, home: uzHome, legal: uzLegal, about: uzAbout },
  en: { navbar: enNavbar, footer: enFooter, home: enHome, legal: enLegal, about: enAbout },
};

const saved = localStorage.getItem("hq_lang");

i18n.use(initReactI18next).init({
  resources,
  lng: saved || "ru",
  fallbackLng: "ru",
  ns: ["navbar", "footer", "home", "legal", "about"],
  defaultNS: "home",
  interpolation: { escapeValue: false },
});

export default i18n;
