import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supportedLanguages, type SupportedLanguage } from '../i18n'

// IDs das secções, na ordem em que aparecem na página — usados tanto para
// gerar os links de navegação como os ids das âncoras em cada <section>.
const NAV_ITEMS = ['hero', 'menu', 'about', 'gallery', 'reservation', 'contact'] as const

function Header() {
  const { t, i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <a href="#hero" className="text-lg font-semibold text-neutral-800">
          Restaurante
        </a>

        <nav className="hidden md:flex md:items-center md:gap-6">
          {NAV_ITEMS.map((item) => (
            <a key={item} href={`#${item}`} className="text-sm text-neutral-600 hover:text-neutral-900">
              {t(`nav.${item}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden gap-2 sm:flex">
            {supportedLanguages.map((lang: SupportedLanguage) => (
              <button
                key={lang}
                type="button"
                onClick={() => i18n.changeLanguage(lang)}
                aria-pressed={i18n.resolvedLanguage === lang}
                className="rounded border border-neutral-300 px-2 py-1 text-xs uppercase text-neutral-600 hover:bg-neutral-100 aria-pressed:bg-neutral-800 aria-pressed:text-white"
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="md:hidden"
            aria-label="Abrir menu de navegação"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {/* SVG em vez de emoji para o ícone de menu, como definido no CLAUDE.md */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="flex flex-col gap-1 border-t border-neutral-200 bg-white px-4 py-3 md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="py-2 text-sm text-neutral-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {t(`nav.${item}`)}
            </a>
          ))}
          <div className="mt-2 flex gap-2">
            {supportedLanguages.map((lang: SupportedLanguage) => (
              <button
                key={lang}
                type="button"
                onClick={() => i18n.changeLanguage(lang)}
                aria-pressed={i18n.resolvedLanguage === lang}
                className="rounded border border-neutral-300 px-2 py-1 text-xs uppercase text-neutral-600 aria-pressed:bg-neutral-800 aria-pressed:text-white"
              >
                {lang}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header
