import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ruNavbar from "./locales/ru/navbar.json";
import enNavbar from "./locales/en/navbar.json";
import uzNavbar from "./locales/uz/navbar.json";
import ruFooter from "./locales/ru/footer.json";
import enFooter from "./locales/en/footer.json";
import uzFooter from "./locales/uz/footer.json";
import ruAuth from "./locales/ru/auth.json";
import enAuth from "./locales/en/auth.json";
import uzAuth from "./locales/uz/auth.json";


i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        navbar: ruNavbar,
        footer: ruFooter,
        auth: ruAuth
      },
      en: {
        navbar: enNavbar,
        footer: enFooter,
        auth: enAuth
      },
      uz: {
        navbar: uzNavbar,
        footer: uzFooter,
        auth: uzAuth
      },
    },
    lng: "ru",
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
