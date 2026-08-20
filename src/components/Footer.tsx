import { useTranslation } from 'react-i18next'
import { restaurantInfo } from '../data/restaurantInfo'

function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200 px-4 py-8 text-center text-sm text-neutral-500">
      © {year} {restaurantInfo.name}. {t('footer.rights')}
    </footer>
  )
}

export default Footer
