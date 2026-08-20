import { z } from 'zod'
import { RESERVATION_TIME_SLOTS } from '../../src/data/reservationSlots'

// Limites de tamanho — proteção contra payloads anormalmente grandes/abuso,
// independentemente do limite de bytes já aplicado ao pedido HTTP como um todo.
const NAME_MAX = 100
const EMAIL_MAX = 200
const SUBJECT_MAX = 150
const MESSAGE_MAX = 2000
const PHONE_MAX = 30
// Mantido em sincronia com RESERVATION_MAX_DAYS_AHEAD em
// src/components/ReservationForm.tsx (limite do seletor de data no browser).
const RESERVATION_MAX_DAYS_AHEAD = 30

// Honeypot: campo invisível para pessoas mas que os bots de spam costumam
// preencher automaticamente. Aceita QUALQUER valor aqui (não rejeitamos na
// validação) — é o handler que decide, em silêncio, não enviar o email e
// responder "sucesso" na mesma. Se a validação rejeitasse este campo, o erro
// devolvido revelaria ao bot exatamente qual o campo armadilhado.
const honeypot = z.string().optional()

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Nome obrigatório').max(NAME_MAX),
  email: z.email('Email inválido').max(EMAIL_MAX),
  subject: z.string().trim().min(1, 'Assunto obrigatório').max(SUBJECT_MAX),
  message: z.string().trim().min(1, 'Mensagem obrigatória').max(MESSAGE_MAX),
  website: honeypot,
})

export type ContactPayload = z.infer<typeof contactSchema>

function isValidReservationDate(value: string): boolean {
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + RESERVATION_MAX_DAYS_AHEAD)

  return date >= today && date <= maxDate
}

export const reservationSchema = z.object({
  name: z.string().trim().min(1, 'Nome obrigatório').max(NAME_MAX),
  email: z.email('Email inválido').max(EMAIL_MAX),
  phone: z.string().trim().min(1, 'Telefone obrigatório').max(PHONE_MAX),
  // Formato ISO simples "AAAA-MM-DD", validado nos limites de data pelo refine abaixo.
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida')
    .refine(isValidReservationDate, 'Escolhe uma data entre hoje e os próximos 30 dias'),
  // Só aceita um dos horários fixos definidos em src/data/reservationSlots.ts
  // (necessário para conseguirmos somar reservas por horário e controlar a lotação).
  time: z.enum(RESERVATION_TIME_SLOTS, { message: 'Hora inválida' }),
  guests: z.coerce.number().int().min(1, 'Mínimo de 1 pessoa').max(20, 'Máximo de 20 pessoas'),
  notes: z.string().trim().max(MESSAGE_MAX).optional().or(z.literal('')),
  website: honeypot,
})

export type ReservationPayload = z.infer<typeof reservationSchema>
