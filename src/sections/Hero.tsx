import SectionContainer from '../components/SectionContainer'
import { useLocalizedText } from '../hooks/useLocalizedText'
import { restaurantInfo } from '../data/restaurantInfo'

function Hero() {
  const localize = useLocalizedText()

  return (
    <SectionContainer
      id="hero"
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center"
    >
      <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">{restaurantInfo.name}</h1>
      <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-16 rounded bg-terracotta" />
      <p className="mt-4 text-lg text-ink-soft">{localize(restaurantInfo.tagline)}</p>
    </SectionContainer>
  )
}

export default Hero
