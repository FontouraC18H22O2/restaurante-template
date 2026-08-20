import { contactSchema } from './_lib/validation'
import { sendNotificationEmail, escapeHtml } from './_lib/email'
import { isRateLimited } from './_lib/rateLimit'
import { MAX_BODY_BYTES, jsonResponse, getClientIp } from './_lib/http'

// Edge Function: usa a Web API padrão (Request/Response), sem dependência do
// pacote @vercel/node — mais leve e sem a árvore de dependências (com
// vulnerabilidades conhecidas) que esse pacote arrasta consigo.
export const config = { runtime: 'edge' }

export default async function handler(request: Request): Promise<Response> {
  // O "error" devolvido é sempre um código curto (não texto), para o frontend
  // poder traduzir a mensagem consoante o idioma ativo no site (PT/EN) — ver
  // forms.errors.* em src/i18n/locales/.
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405)
  }

  const contentLength = Number(request.headers.get('content-length') ?? '0')
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ error: 'payload_too_large' }, 413)
  }

  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return jsonResponse({ error: 'rate_limited' }, 429)
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonResponse({ error: 'invalid_json' }, 400)
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return jsonResponse({ error: 'invalid_data', issues: result.error.flatten() }, 400)
  }

  const { name, email, subject, message, website } = result.data

  // Honeypot preenchido = bot. Respondemos "sucesso" para não revelar ao bot
  // que foi apanhado, mas não enviamos email nenhum.
  if (website) {
    return jsonResponse({ ok: true })
  }

  try {
    await sendNotificationEmail({
      subject: `[Contacto] ${subject}`,
      replyTo: email,
      html: `
        <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Assunto:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    })
  } catch (error) {
    console.error('Erro ao enviar email de contacto:', error)
    return jsonResponse({ error: 'send_failed' }, 502)
  }

  return jsonResponse({ ok: true })
}
