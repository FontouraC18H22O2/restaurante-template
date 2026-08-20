import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'
import { useLocalizedText } from '../hooks/useLocalizedText'
import { restaurantInfo } from '../data/restaurantInfo'

function About() {
  const { t } = useTranslation()
  const localize = useLocalizedText()

  return (
    <SectionContainer id="about">
      <h2 className="text-3xl font-semibold text-neutral-900">{t('sections.about.title')}</h2>
      <p className="mt-4 max-w-2xl text-neutral-600">{localize(restaurantInfo.description)}</p>
    </SectionContainer>
  )
}

export default About
