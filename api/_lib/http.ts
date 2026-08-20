/** Limite de tamanho do corpo do pedido — protege contra payloads anormalmente grandes. */
export const MAX_BODY_BYTES = 10_000

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

export function getClientIp(request: Request): string {
  // A Vercel injeta este header com o IP real do cliente atrás do proxy.
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() ?? 'unknown'
}
