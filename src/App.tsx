import { useTranslation } from 'react-i18next'
import { supportedLanguages, type SupportedLanguage } from './i18n'

// Esqueleto do projeto — as secções reais (Hero, Menu, Sobre, Galeria, Reservas, Contacto)
// serão adicionadas nos próximos passos, dentro de src/sections/, e vão substituir
// este placeholder e o seletor de idioma (que aí passa a viver no Header/Nav).
function App() {
  const { t, i18n } = useTranslation()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-50">
      <h1 className="text-2xl font-semibold text-neutral-800">{t('common.skeletonReady')}</h1>

      <div className="flex gap-2">
        {supportedLanguages.map((lang: SupportedLanguage) => (
          <button
            key={lang}
            type="button"
            onClick={() => i18n.changeLanguage(lang)}
            className="rounded border border-neutral-300 px-3 py-1 text-sm uppercase text-neutral-600 hover:bg-neutral-200"
          >
            {lang}
          </button>
        ))}
      </div>
    </main>
  )
}

export default App
