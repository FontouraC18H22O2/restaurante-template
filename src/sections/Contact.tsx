import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'
import SectionHeading from '../components/SectionHeading'
import ContactForm from '../components/ContactForm'

function Contact() {
  const { t } = useTranslation()

  return (
    <SectionContainer id="contact" className="bg-cream-dark">
      <SectionHeading>{t('sections.contact.title')}</SectionHeading>
      <div className="mt-8">
        <ContactForm />
      </div>
    </SectionContainer>
  )
}

export default Contact
