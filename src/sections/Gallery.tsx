import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'
import SectionHeading from '../components/SectionHeading'
import { useLocalizedText } from '../hooks/useLocalizedText'
import { galleryPhotos } from '../data/gallery'

function Gallery() {
  const { t } = useTranslation()
  const localize = useLocalizedText()

  return (
    <SectionContainer id="gallery" className="bg-cream-dark">
      <SectionHeading>{t('sections.gallery.title')}</SectionHeading>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {galleryPhotos.map((photo) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={localize(photo.alt)}
            loading="lazy"
            className="aspect-square rounded border border-border object-cover"
          />
        ))}
      </div>
    </SectionContainer>
  )
}

export default Gallery
