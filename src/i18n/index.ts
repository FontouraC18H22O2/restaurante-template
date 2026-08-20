import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import pt from './locales/pt.json'
import en from './locales/en.json'

export const defaultLanguage = 'pt'
export const supportedLanguages = ['pt', 'en'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

// LanguageDetector: deteta o idioma do browser e guarda a escolha do
// utilizador em localStorage — é só uma preferência de UI (não um segredo),
// por isso não entra em conflito com a regra de "nada sensível em localStorage".
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
    },
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    interpolation: {
      // O React já faz escape de output por defeito (proteção XSS mantém-se).
      escapeValue: false,
    },
  })

export default i18n
