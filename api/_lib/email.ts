import { Resend } from 'resend'

let client: Resend | null = null

function getClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY não está definida nas variáveis de ambiente')
  }
  client ??= new Resend(apiKey)
  return client
}

// Enquanto não houver um domínio próprio verificado na Resend, o remetente
// tem obrigatoriamente de ser o domínio de sandbox deles.
const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

interface SendNotificationParams {
  subject: string
  html: string
  /** Email da pessoa que preencheu o formulário — permite responder diretamente do email. */
  replyTo: string
}

export async function sendNotificationEmail({ subject, html, replyTo }: SendNotificationParams) {
  const to = process.env.RESTAURANT_NOTIFICATION_EMAIL
  if (!to) {
    throw new Error('RESTAURANT_NOTIFICATION_EMAIL não está definida nas variáveis de ambiente')
  }

  const resend = getClient()
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject,
    html,
    replyTo,
  })

  if (error) {
    throw new Error(`Falha ao enviar email via Resend: ${error.message}`)
  }
}

// Escapa input do utilizador antes de o inserir no HTML do email — sem isto,
// alguém podia meter tags/scripts no nome ou na mensagem (injeção de HTML).
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
