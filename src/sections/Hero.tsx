import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'

function Hero() {
  const { t } = useTranslation()

  return (
    <SectionContainer
      id="hero"
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center"
    >
      <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">{t('sections.hero.title')}</h1>
      <p className="mt-4 text-lg text-neutral-600">{t('sections.hero.subtitle')}</p>
    </SectionContainer>
  )
}

export default Hero
