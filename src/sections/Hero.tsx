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
      <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">{restaurantInfo.name}</h1>
      <p className="mt-4 text-lg text-neutral-600">{localize(restaurantInfo.tagline)}</p>
    </SectionContainer>
  )
}

export default Hero
