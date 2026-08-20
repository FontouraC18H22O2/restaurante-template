import { reservationSchema } from './_lib/validation'
import { sendNotificationEmail, escapeHtml } from './_lib/email'
import { isRateLimited } from './_lib/rateLimit'
import { MAX_BODY_BYTES, jsonResponse, getClientIp } from './_lib/http'

// Edge Function: usa a Web API padrão (Request/Response), sem dependência do
// pacote @vercel/node — mais leve e sem a árvore de dependências (com
// vulnerabilidades conhecidas) que esse pacote arrasta consigo.
export const config = { runtime: 'edge' }

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Método não permitido' }, 405)
  }

  const contentLength = Number(request.headers.get('content-length') ?? '0')
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ error: 'Pedido demasiado grande' }, 413)
  }

  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return jsonResponse({ error: 'Demasiados pedidos. Tenta novamente daqui a pouco.' }, 429)
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonResponse({ error: 'JSON inválido' }, 400)
  }

  const result = reservationSchema.safeParse(body)
  if (!result.success) {
    return jsonResponse({ error: 'Dados inválidos', issues: result.error.flatten() }, 400)
  }

  const { name, email, phone, date, time, guests, notes, website } = result.data

  // Honeypot preenchido = bot. Respondemos "sucesso" para não revelar ao bot
  // que foi apanhado, mas não enviamos email nenhum.
  if (website) {
    return jsonResponse({ ok: true })
  }

  try {
    await sendNotificationEmail({
      subject: `[Reserva] ${name} — ${date} ${time}`,
      replyTo: email,
      html: `
        <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Data:</strong> ${escapeHtml(date)}</p>
        <p><strong>Hora:</strong> ${escapeHtml(time)}</p>
        <p><strong>Pessoas:</strong> ${guests}</p>
        ${notes ? `<p><strong>Notas:</strong></p><p>${escapeHtml(notes).replace(/\n/g, '<br>')}</p>` : ''}
      `,
    })
  } catch (error) {
    console.error('Erro ao enviar email de reserva:', error)
    return jsonResponse({ error: 'Não foi possível enviar o pedido de reserva. Tenta novamente mais tarde.' }, 502)
  }

  return jsonResponse({ ok: true })
}
