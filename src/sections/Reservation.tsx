import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'
import ReservationForm from '../components/ReservationForm'

function Reservation() {
  const { t } = useTranslation()

  return (
    <SectionContainer id="reservation">
      <h2 className="text-3xl font-semibold text-neutral-900">{t('sections.reservation.title')}</h2>
      <div className="mt-8">
        <ReservationForm />
      </div>
    </SectionContainer>
  )
}

export default Reservation
