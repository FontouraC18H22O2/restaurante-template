import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'

// As fotos reais e o mapa (Google Maps embed) entram num passo dedicado.
function Gallery() {
  const { t } = useTranslation()

  return (
    <SectionContainer id="gallery" className="bg-neutral-50">
      <h2 className="text-3xl font-semibold text-neutral-900">{t('sections.gallery.title')}</h2>
      <p className="mt-4 text-neutral-600">{t('sections.gallery.placeholder')}</p>
    </SectionContainer>
  )
}

export default Gallery
