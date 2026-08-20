import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'

function About() {
  const { t } = useTranslation()

  return (
    <SectionContainer id="about">
      <h2 className="text-3xl font-semibold text-neutral-900">{t('sections.about.title')}</h2>
      <p className="mt-4 text-neutral-600">{t('sections.about.placeholder')}</p>
    </SectionContainer>
  )
}

export default About
