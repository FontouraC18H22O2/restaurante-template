import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'
import SectionHeading from '../components/SectionHeading'
import { useLocalizedText } from '../hooks/useLocalizedText'
import { restaurantInfo } from '../data/restaurantInfo'

function About() {
  const { t } = useTranslation()
  const localize = useLocalizedText()

  return (
    <SectionContainer id="about" className="bg-cream-dark">
      <SectionHeading>{t('sections.about.title')}</SectionHeading>
      <p className="mt-4 max-w-2xl text-ink-soft">{localize(restaurantInfo.description)}</p>
    </SectionContainer>
  )
}

export default About
