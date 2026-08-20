import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supportedLanguages, type SupportedLanguage } from '../i18n'
import { restaurantInfo } from '../data/restaurantInfo'

// IDs das secções, na ordem em que aparecem na página — usados tanto para
// gerar os links de navegação como os ids das âncoras em cada <section>.
const NAV_ITEMS = ['hero', 'menu', 'about', 'gallery', 'reservation', 'contact'] as const

function Header() {
  const { t, i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <a href="#hero" className="font-display text-lg font-semibold text-ink">
          {restaurantInfo.name}
        </a>

        <nav className="hidden md:flex md:items-center md:gap-6">
          {NAV_ITEMS.map((item) => (
            <a key={item} href={`#${item}`} className="text-sm text-ink-soft hover:text-terracotta">
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
                className="rounded border border-border px-2 py-1 text-xs uppercase text-ink-soft hover:bg-cream-dark aria-pressed:border-terracotta aria-pressed:bg-terracotta aria-pressed:text-cream"
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="text-ink md:hidden"
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
        <nav className="flex flex-col gap-1 border-t border-border bg-cream px-4 py-3 md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="py-2 text-sm text-ink-soft"
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
                className="rounded border border-border px-2 py-1 text-xs uppercase text-ink-soft aria-pressed:border-terracotta aria-pressed:bg-terracotta aria-pressed:text-cream"
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
