import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'
import SectionHeading from '../components/SectionHeading'
import ReservationForm from '../components/ReservationForm'

function Reservation() {
  const { t } = useTranslation()

  return (
    <SectionContainer id="reservation">
      <SectionHeading>{t('sections.reservation.title')}</SectionHeading>
      <div className="mt-8">
        <ReservationForm />
      </div>
    </SectionContainer>
  )
}

export default Reservation
