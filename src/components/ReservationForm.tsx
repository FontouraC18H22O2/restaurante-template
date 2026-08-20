import { useMemo, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormSubmission } from '../hooks/useFormSubmission'
import { RESERVATION_TIME_SLOTS } from '../data/reservationSlots'
import HoneypotField from './HoneypotField'
import FormField from './FormField'
import FormSelect from './FormSelect'
import FormTextArea from './FormTextArea'

function currentTimeHHMM(): string {
  const now = new Date()
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
}

function ReservationForm() {
  const { t } = useTranslation()
  const { status, errorCode, submit } = useFormSubmission('/api/reservation')

  // Limita o seletor de data no browser a um intervalo próximo (hoje até daqui
  // a 30 dias) — mantido em sincronia com RESERVATION_MAX_DAYS_AHEAD em
  // api/_lib/validation.ts, que é sempre a validação que conta a sério.
  const today = new Date()
  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + 30)
  const todayISO = today.toISOString().slice(0, 10)
  const maxDateISO = maxDate.toISOString().slice(0, 10)

  // Data e hora ficam controladas para conseguirmos filtrar os horários já
  // passados quando a data escolhida é hoje (ex: às 21h já não faz sentido
  // mostrar o horário das 19h). Ao mudar de data, a hora escolhida é limpa,
  // porque um horário válido para outro dia pode já não fazer sentido.
  const [date, setDate] = useState(todayISO)
  const [time, setTime] = useState('')

  const availableTimeSlots = useMemo(() => {
    if (date !== todayISO) return RESERVATION_TIME_SLOTS
    const now = currentTimeHHMM()
    return RESERVATION_TIME_SLOTS.filter((slot) => slot > now)
  }, [date, todayISO])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const ok = await submit({
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      date: data.get('date'),
      time: data.get('time'),
      guests: data.get('guests'),
      notes: data.get('notes'),
      website: data.get('website'),
    })

    if (ok) {
      form.reset()
      // form.reset() só repõe os campos não controlados — data/hora são
      // controlados por estado do React, por isso repomos à parte.
      setDate(todayISO)
      setTime('')
    }
  }

  if (status === 'success') {
    return (
      <p role="status" className="max-w-2xl rounded border border-olive bg-cream p-4 text-olive-dark">
        {t('forms.reservation.success')}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-2xl gap-4 sm:grid-cols-2">
      <HoneypotField />

      <FormField
        id="reservation-name"
        name="name"
        type="text"
        label={t('forms.reservation.name')}
        required
        maxLength={100}
        autoComplete="name"
      />

      <FormField
        id="reservation-email"
        name="email"
        type="email"
        label={t('forms.reservation.email')}
        required
        maxLength={200}
        autoComplete="email"
      />

      <FormField
        id="reservation-phone"
        name="phone"
        type="tel"
        label={t('forms.reservation.phone')}
        required
        maxLength={30}
        autoComplete="tel"
      />

      <FormField
        id="reservation-guests"
        name="guests"
        type="number"
        label={t('forms.reservation.guests')}
        required
        min={1}
        max={20}
        defaultValue={2}
      />

      <FormField
        id="reservation-date"
        name="date"
        type="date"
        label={t('forms.reservation.date')}
        required
        min={todayISO}
        max={maxDateISO}
        value={date}
        onChange={(event) => {
          setDate(event.target.value)
          setTime('')
        }}
      />

      <FormSelect
        id="reservation-time"
        name="time"
        label={t('forms.reservation.time')}
        required
        value={time}
        onChange={(event) => setTime(event.target.value)}
      >
        <option value="" disabled>
          {availableTimeSlots.length > 0 ? t('forms.reservation.selectTime') : t('forms.reservation.noTimesToday')}
        </option>
        {availableTimeSlots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </FormSelect>

      <FormTextArea
        id="reservation-notes"
        name="notes"
        label={t('forms.reservation.notes')}
        maxLength={2000}
        rows={3}
        containerClassName="sm:col-span-2"
      />

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-700 sm:col-span-2">
          {t(`forms.errors.${errorCode}`, { defaultValue: t('forms.errors.generic') })}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-fit rounded bg-terracotta px-5 py-2 text-sm font-medium text-cream hover:bg-terracotta-dark disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2"
      >
        {status === 'loading' ? t('forms.reservation.sending') : t('forms.reservation.submit')}
      </button>
    </form>
  )
}

export default ReservationForm
