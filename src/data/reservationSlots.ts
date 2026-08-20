// Configuração do motor de reservas — usada tanto pelo formulário (dropdown
// de horas) como pela função serverless (api/reservation.ts e
// api/_lib/validation.ts), para validar e controlar a lotação.
//
// Os horários aqui são um exemplo genérico (almoço/jantar) — ajustar para
// corresponder ao horário real do restaurante em src/data/restaurantInfo.ts.
// NOTA: esta lista não sabe que dia da semana é (ex: não impede reservar
// à Segunda-feira, mesmo estando o restaurante fechado nesse dia nos dados
// de exemplo). Para isso ser validado automaticamente seria preciso
// estruturar os horários por dia da semana — deixado como possível melhoria
// futura, fora do âmbito deste passo.
export const RESERVATION_TIME_SLOTS = ['12:00', '13:00', '14:00', '19:00', '20:00', '21:00', '22:00'] as const

export type ReservationTimeSlot = (typeof RESERVATION_TIME_SLOTS)[number]

// Número máximo de pessoas (soma de todas as reservas) permitido em cada
// horário — é isto que define quando um horário fica "cheio".
export const MAX_GUESTS_PER_SLOT = 40
