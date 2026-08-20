import { useState } from 'react'

export type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error'

// Hook partilhado por ContactForm e ReservationForm: faz o POST para a função
// serverless e devolve o estado do pedido. O "errorCode" é o código curto que
// a API devolve (ver api/contact.ts / api/reservation.ts) — a tradução para
// texto legível fica a cargo do componente, via forms.errors.<codigo> no i18n.
export function useFormSubmission(endpoint: string) {
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [errorCode, setErrorCode] = useState<string | null>(null)

  async function submit(payload: Record<string, unknown>): Promise<boolean> {
    setStatus('loading')
    setErrorCode(null)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data: unknown = await response.json().catch(() => null)
        const code =
          data && typeof data === 'object' && 'error' in data && typeof data.error === 'string'
            ? data.error
            : 'generic'
        setErrorCode(code)
        setStatus('error')
        return false
      }

      setStatus('success')
      return true
    } catch {
      // Falha de rede (sem ligação, servidor em baixo, etc.) — não vem da API,
      // por isso usamos um código próprio do lado do cliente.
      setErrorCode('network')
      setStatus('error')
      return false
    }
  }

  return { status, errorCode, submit }
}
