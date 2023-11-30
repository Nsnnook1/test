import { initReactI18next } from "react-i18next";
import i18next from "i18next";

import translationEN from './en.json'
import translationTH from './th.json'

const resources = {
  en: {
    translation: translationEN
  },
  th: {
    translation: translationTH
  }
}

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    interpolation: {
      escapeValue: false
    }
  })

export default i18next