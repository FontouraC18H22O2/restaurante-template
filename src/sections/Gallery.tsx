import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'
import { useLocalizedText } from '../hooks/useLocalizedText'
import { restaurantInfo } from '../data/restaurantInfo'

const PLACEHOLDER_PHOTO_COUNT = 6

function Gallery() {
  const { t } = useTranslation()
  const localize = useLocalizedText()

  return (
    <SectionContainer id="gallery" className="bg-neutral-50">
      <h2 className="text-3xl font-semibold text-neutral-900">{t('sections.gallery.title')}</h2>

      {/* Fotos reais do espaço/pratos entram em public/images quando tivermos os ficheiros do cliente */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: PLACEHOLDER_PHOTO_COUNT }, (_, index) => (
          <div key={index} className="aspect-square rounded bg-neutral-200" />
        ))}
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold text-neutral-800">{t('sections.gallery.locationTitle')}</h3>

          <address className="mt-2 not-italic text-neutral-600">
            {restaurantInfo.address}
            <br />
            {restaurantInfo.phone}
            <br />
            {restaurantInfo.email}
          </address>

          <ul className="mt-4 space-y-1 text-sm text-neutral-600">
            {restaurantInfo.openingHours.map((entry) => (
              <li key={localize(entry.days)}>
                <span className="font-medium">{localize(entry.days)}:</span> {localize(entry.hours)}
              </li>
            ))}
          </ul>
        </div>

        <iframe
          title={t('sections.gallery.locationTitle')}
          src={restaurantInfo.mapEmbedUrl}
          className="h-64 w-full rounded border border-neutral-200 sm:h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </SectionContainer>
  )
}

export default Gallery
