import { useTranslation } from 'react-i18next'
import { defaultLanguage, type SupportedLanguage } from '../i18n'
import type { LocalizedText } from '../types/restaurant'

// Devolve uma função que resolve um LocalizedText (dados de src/data/) para o
// idioma atualmente ativo no site, com fallback para o idioma por omissão.
export function useLocalizedText() {
  const { i18n } = useTranslation()
  const lang = (i18n.resolvedLanguage ?? defaultLanguage) as SupportedLanguage

  return (text: LocalizedText) => text[lang] ?? text[defaultLanguage]
}
