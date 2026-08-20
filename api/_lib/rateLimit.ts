// Rate limiting simples, em memória, por IP.
//
// AVISO: as funções serverless da Vercel podem escalar para várias instâncias
// e reiniciar a qualquer momento — isto NÃO garante um limite global rigoroso,
// é apenas uma primeira barreira contra abuso trivial (ex: um script a martelar
// o mesmo endpoint repetidamente). Para uma garantia real e distribuída entre
// instâncias, evoluir para um serviço externo como o Upstash Redis
// (pacote @upstash/ratelimit), mantendo a mesma assinatura desta função.
const WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 5

const hits = new Map<string, number[]>()

export function isRateLimited(identifier: string): boolean {
  const now = Date.now()
  const recentHits = (hits.get(identifier) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS)

  if (recentHits.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(identifier, recentHits)
    return true
  }

  recentHits.push(now)
  hits.set(identifier, recentHits)
  return false
}
