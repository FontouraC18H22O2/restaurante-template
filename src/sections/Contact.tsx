import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'
import SectionHeading from '../components/SectionHeading'
import ContactForm from '../components/ContactForm'
import { useLocalizedText } from '../hooks/useLocalizedText'
import { restaurantInfo } from '../data/restaurantInfo'

function Contact() {
  const { t } = useTranslation()
  const localize = useLocalizedText()

  return (
    <SectionContainer id="contact" className="bg-cream-dark">
      <SectionHeading>{t('sections.contact.title')}</SectionHeading>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <ContactForm />

        <div>
          <h3 className="font-display text-xl font-semibold text-ink">{t('sections.contact.locationTitle')}</h3>

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

          <iframe
            title={t('sections.contact.locationTitle')}
            src={restaurantInfo.mapEmbedUrl}
            className="mt-6 h-64 w-full rounded border border-border"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </SectionContainer>
  )
}

export default Contact
