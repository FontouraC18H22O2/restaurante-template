import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormSubmission } from '../hooks/useFormSubmission'
import HoneypotField from './HoneypotField'
import FormField from './FormField'
import FormTextArea from './FormTextArea'

function ContactForm() {
  const { t } = useTranslation()
  const { status, errorCode, submit } = useFormSubmission('/api/contact')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const ok = await submit({
      name: data.get('name'),
      email: data.get('email'),
      subject: data.get('subject'),
      message: data.get('message'),
      website: data.get('website'),
    })

    if (ok) form.reset()
  }

  if (status === 'success') {
    return (
      <p role="status" className="max-w-xl rounded border border-green-200 bg-green-50 p-4 text-green-800">
        {t('forms.contact.success')}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-xl gap-4">
      <HoneypotField />

      <FormField
        id="contact-name"
        name="name"
        type="text"
        label={t('forms.contact.name')}
        required
        maxLength={100}
        autoComplete="name"
      />

      <FormField
        id="contact-email"
        name="email"
        type="email"
        label={t('forms.contact.email')}
        required
        maxLength={200}
        autoComplete="email"
      />

      <FormField
        id="contact-subject"
        name="subject"
        type="text"
        label={t('forms.contact.subject')}
        required
        maxLength={150}
      />

      <FormTextArea
        id="contact-message"
        name="message"
        label={t('forms.contact.message')}
        required
        maxLength={2000}
        rows={5}
      />

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-700">
          {t(`forms.errors.${errorCode}`, { defaultValue: t('forms.errors.generic') })}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-fit rounded bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'loading' ? t('forms.contact.sending') : t('forms.contact.submit')}
      </button>
    </form>
  )
}

export default ContactForm
