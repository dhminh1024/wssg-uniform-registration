import i18n from "i18next";

import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// import backend from "i18next-http-backend";

import vn from "./resources/vn.json";
import en from "./resources/en.json";

const fallbackLng = "en";
const languages: string[] = [fallbackLng, "vn"];

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    supportedLngs: languages,
    fallbackLng,
    resources: {
      vn: {
        translation: vn,
      },
      en: {
        translation: en,
      },
    },
    keySeparator: false,
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
