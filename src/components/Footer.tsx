import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200 px-4 py-8 text-center text-sm text-neutral-500">
      © {year} Restaurante. {t('footer.rights')}
    </footer>
  )
}

export default Footer
