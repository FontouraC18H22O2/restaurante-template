import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'
import ContactForm from '../components/ContactForm'

function Contact() {
  const { t } = useTranslation()

  return (
    <SectionContainer id="contact" className="bg-neutral-50">
      <h2 className="text-3xl font-semibold text-neutral-900">{t('sections.contact.title')}</h2>
      <div className="mt-8">
        <ContactForm />
      </div>
    </SectionContainer>
  )
}

export default Contact
