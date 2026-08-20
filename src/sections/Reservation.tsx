import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'

// O formulário real (com validação e ligação à função serverless /api/reservation)
// entra num passo dedicado, depois de termos os dados/tipos definidos.
function Reservation() {
  const { t } = useTranslation()

  return (
    <SectionContainer id="reservation">
      <h2 className="text-3xl font-semibold text-neutral-900">{t('sections.reservation.title')}</h2>
      <p className="mt-4 text-neutral-600">{t('sections.reservation.placeholder')}</p>
    </SectionContainer>
  )
}

export default Reservation
