import { Redis } from '@upstash/redis'
import { MAX_GUESTS_PER_SLOT } from '../../src/data/reservationSlots'

let client: Redis | null = null

// Enquanto o Upstash Redis não estiver configurado (variáveis de ambiente
// por preencher), o controlo de lotação fica desativado — as reservas
// continuam a ser aceites normalmente, só sem verificar a capacidade.
// Isto evita que o formulário de reservas fique completamente partido
// antes de configurarmos o Redis (ver .env.example).
function getClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) {
    return null
  }
  client ??= new Redis({ url, token })
  return client
}

// Quanto tempo o contador de um horário fica guardado depois de criado —
// só precisa de sobreviver ao período em que ainda se pode reservar para
// essa data (ver RESERVATION_MAX_DAYS_AHEAD em validation.ts), com folga.
const SLOT_KEY_TTL_SECONDS = 45 * 24 * 60 * 60

function slotKey(date: string, time: string): string {
  return `reservations:${date}:${time}`
}

/**
 * Reserva "guests" lugares no horário indicado, de forma atómica: incrementa
 * primeiro e só depois verifica se ultrapassou a lotação — se ultrapassou,
 * desfaz o incremento. Isto evita a condição de corrida em que dois pedidos
 * em simultâneo (ex: João e Mário a reservar ao mesmo tempo) leem o mesmo
 * valor "antigo" e ambos pensam que ainda cabem, resultando em overbooking.
 * O INCRBY do Redis é atómico mesmo com pedidos concorrentes — só o último
 * a ultrapassar o limite é que falha (ex: o Luís, no exemplo do README).
 *
 * Devolve true se a reserva foi aceite (lugar garantido, ou lotação
 * desativada por o Redis ainda não estar configurado), false se o
 * horário já está cheio.
 */
export async function tryReserveSlot(date: string, time: string, guests: number): Promise<boolean> {
  const redis = getClient()
  if (!redis) return true

  const key = slotKey(date, time)

  const newTotal = await redis.incrby(key, guests)
  await redis.expire(key, SLOT_KEY_TTL_SECONDS)

  if (newTotal > MAX_GUESTS_PER_SLOT) {
    await redis.decrby(key, guests)
    return false
  }

  return true
}

/**
 * Liberta lugares previamente reservados com tryReserveSlot — usar quando a
 * reserva acaba por não se concretizar (ex: falha o envio do email de
 * notificação), para não ficar capacidade "presa" por uma reserva que o
 * restaurante nunca chegou a ver.
 */
export async function releaseSlot(date: string, time: string, guests: number): Promise<void> {
  const redis = getClient()
  if (!redis) return

  await redis.decrby(slotKey(date, time), guests)
}
