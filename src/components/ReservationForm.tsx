import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormSubmission } from '../hooks/useFormSubmission'
import HoneypotField from './HoneypotField'
import FormField from './FormField'
import FormTextArea from './FormTextArea'

function ReservationForm() {
  const { t } = useTranslation()
  const { status, errorCode, submit } = useFormSubmission('/api/reservation')

  // Impede escolher datas no passado diretamente no seletor do browser —
  // a validação que conta a sério é sempre a do servidor (ver api/_lib/validation.ts).
  const today = new Date().toISOString().slice(0, 10)

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

    if (ok) form.reset()
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

      <FormField id="reservation-date" name="date" type="date" label={t('forms.reservation.date')} required min={today} />

      <FormField id="reservation-time" name="time" type="time" label={t('forms.reservation.time')} required />

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
