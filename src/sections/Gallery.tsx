import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'
import SectionHeading from '../components/SectionHeading'
import { useLocalizedText } from '../hooks/useLocalizedText'
import { restaurantInfo } from '../data/restaurantInfo'

const PLACEHOLDER_PHOTO_COUNT = 6

function Gallery() {
  const { t } = useTranslation()
  const localize = useLocalizedText()

  return (
    <SectionContainer id="gallery" className="bg-cream-dark">
      <SectionHeading>{t('sections.gallery.title')}</SectionHeading>

      {/* Fotos reais do espaço/pratos entram em public/images quando tivermos os ficheiros do cliente */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: PLACEHOLDER_PHOTO_COUNT }, (_, index) => (
          <div key={index} className="aspect-square rounded border border-border bg-cream" />
        ))}
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="font-display text-xl font-semibold text-ink">{t('sections.gallery.locationTitle')}</h3>

          <address className="mt-2 not-italic text-ink-soft">
            {restaurantInfo.address}
            <br />
            {restaurantInfo.phone}
            <br />
            {restaurantInfo.email}
          </address>

          <ul className="mt-4 space-y-1 text-sm text-ink-soft">
            {restaurantInfo.openingHours.map((entry) => (
              <li key={localize(entry.days)}>
                <span className="font-medium text-ink">{localize(entry.days)}:</span> {localize(entry.hours)}
              </li>
            ))}
          </ul>
        </div>

        <iframe
          title={t('sections.gallery.locationTitle')}
          src={restaurantInfo.mapEmbedUrl}
          className="h-64 w-full rounded border border-border sm:h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </SectionContainer>
  )
}

export default Gallery
