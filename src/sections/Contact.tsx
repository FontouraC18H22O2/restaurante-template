import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'

// O formulário real (validação + ligação à função serverless /api/contact)
// entra num passo dedicado, depois de termos os dados/tipos definidos.
function Contact() {
  const { t } = useTranslation()

  return (
    <SectionContainer id="contact" className="bg-neutral-50">
      <h2 className="text-3xl font-semibold text-neutral-900">{t('sections.contact.title')}</h2>
      <p className="mt-4 text-neutral-600">{t('sections.contact.placeholder')}</p>
    </SectionContainer>
  )
}

export default Contact
