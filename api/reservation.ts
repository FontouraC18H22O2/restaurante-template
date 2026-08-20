import { reservationSchema } from './_lib/validation'
import { sendNotificationEmail, escapeHtml } from './_lib/email'
import { isRateLimited } from './_lib/rateLimit'
import { tryReserveSlot, releaseSlot } from './_lib/capacity'
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

  const result = reservationSchema.safeParse(body)
  if (!result.success) {
    return jsonResponse({ error: 'invalid_data', issues: result.error.flatten() }, 400)
  }

  const { name, email, phone, date, time, guests, notes, website } = result.data

  // Honeypot preenchido = bot. Respondemos "sucesso" para não revelar ao bot
  // que foi apanhado, mas não enviamos email nem reservamos lugar nenhum.
  if (website) {
    return jsonResponse({ ok: true })
  }

  // Incrementa atomicamente o total de pessoas já reservadas para este
  // horário. Se ultrapassar a lotação máxima, o pedido é recusado aqui —
  // é isto que garante que, havendo dois pedidos em simultâneo para o
  // último lugar, só um deles é aceite (ver comentário em _lib/capacity.ts).
  const slotAvailable = await tryReserveSlot(date, time, guests)
  if (!slotAvailable) {
    return jsonResponse({ error: 'slot_full' }, 409)
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
    // O restaurante nunca chegou a ver este pedido — liberta o lugar reservado
    // para não ficar capacidade presa por uma reserva que ninguém vai processar.
    await releaseSlot(date, time, guests)
    return jsonResponse({ error: 'send_failed' }, 502)
  }

  return jsonResponse({ ok: true })
}
