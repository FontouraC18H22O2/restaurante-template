import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'

// Pratos e preços reais entram no próximo passo (src/data/menu.ts).
function Menu() {
  const { t } = useTranslation()

  return (
    <SectionContainer id="menu" className="bg-neutral-50">
      <h2 className="text-3xl font-semibold text-neutral-900">{t('sections.menu.title')}</h2>
      <p className="mt-4 text-neutral-600">{t('sections.menu.placeholder')}</p>
    </SectionContainer>
  )
}

export default Menu
